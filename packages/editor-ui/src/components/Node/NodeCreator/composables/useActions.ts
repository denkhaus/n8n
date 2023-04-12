import { reactive, toRefs, getCurrentInstance, computed, onUnmounted, ref } from 'vue';
import {
ActionCreateElement,
	INodeCreateElement,
	LabelCreateElement,
} from '@/Interface';
import { SCHEDULE_TRIGGER_NODE_TYPE, WEBHOOK_NODE_TYPE } from '@/constants';
import { useNodeCreatorStore } from '@/stores/nodeCreator';
import { externalHooks } from '@/mixins/externalHooks';
import { BaseTextKey } from '@/plugins/i18n';
import { useRootStore } from '@/stores/n8nRootStore';
import { sortNodeCreateElements, transformNodeType } from '../utils';

export const useActions = () => {
	const nodeCreatorStore = useNodeCreatorStore();
	const useNodeTypesStore = useNodeCreatorStore();
	const instance = getCurrentInstance();
	const { baseUrl } = useRootStore();
	const { $externalHooks } = new externalHooks();
	const telemetry = instance?.proxy.$telemetry;

	function getPlaceholderTriggerActions(subcategory: string) {
		const nodes = [WEBHOOK_NODE_TYPE, SCHEDULE_TRIGGER_NODE_TYPE];

		const matchedNodeTypes = nodeCreatorStore.mergedNodes
			.filter((node) => nodes.some((n) => n === node.name))
			.map((node) => {
				const transformed = transformNodeType(node, subcategory, 'action');

				if (transformed.type === 'action') {
					const nameBase = node.name.replace('n8n-nodes-base.', '');
					const localeKey = `nodeCreator.actionsPlaceholderNode.${nameBase}` as BaseTextKey;
					const overwriteLocale = instance?.proxy.$locale.baseText(localeKey) as string;

					// If the locale key is not the same as the node name, it means it contain a translation
					// and we should use it
					if (overwriteLocale !== localeKey) {
						transformed.properties.displayName = overwriteLocale;
					}
				}
				return transformed;
			});

		return matchedNodeTypes;
	}

	const actionsCategoryLocales = computed(() => {
		return {
			actions: instance?.proxy.$locale.baseText('nodeCreator.actionsCategory.actions') ?? '',
			triggers: instance?.proxy.$locale.baseText('nodeCreator.actionsCategory.triggers') ?? '',
		};
	});

	function filterActionsCategory(items: INodeCreateElement[], category: string) {
		return items.filter(
			(item) => item.type === 'action' && item.properties.codex.categories.includes(category),
		);
	}

	function injectActionsLabels(items: INodeCreateElement[]): INodeCreateElement[] {
		const extendedActions = sortNodeCreateElements([...items]);
		const labelsSet = new Set<string>();

		// Collect unique labels
		for (const action of extendedActions) {
			if (action.type !== 'action') continue;
			const label = action.properties?.codex?.label;
			labelsSet.add(label);
		}

		if (labelsSet.size <= 1) return extendedActions;

		// Create a map to store the first index of each label
		const firstIndexMap = new Map<string, number>();

		// Iterate through the extendedActions to find the first index of each label
		for (let i = 0; i < extendedActions.length; i++) {
			const action = extendedActions[i];
			if (action.type !== 'action') continue;
			const label = action.properties?.codex?.label;
			if (!firstIndexMap.has(label)) {
				firstIndexMap.set(label, i);
			}
		}

		// Keep track of the number of inserted labels
		let insertedLabels = 0;

		// Create and insert new label objects at the first index of each label
		for (const label of labelsSet) {
			const newLabel: LabelCreateElement = {
				uuid: label,
				type: 'label',
				key: label,
				subcategory: extendedActions[0].key,
				properties: {
					key: label,
				},
			};

			const insertIndex = firstIndexMap.get(label)! + insertedLabels;
			extendedActions.splice(insertIndex, 0, newLabel);
			insertedLabels++;
		}

		return extendedActions;
	}

	function parseCategoryActions(
		actions: INodeCreateElement[],
		category: string,
		withLabels = true,
	) {
		const filteredActions = filterActionsCategory(actions, category);
		if (withLabels) return injectActionsLabels(filteredActions);
		return filteredActions;
	}

	return {
		actionsCategoryLocales,
		getPlaceholderTriggerActions,
		parseCategoryActions,
	};
};