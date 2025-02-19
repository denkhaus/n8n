<template>
	<div>
		<div class="error-header">
			<div class="error-message">{{ getErrorMessage() }}</div>
			<div class="error-description" v-if="error.description" v-html="getErrorDescription()"></div>
		</div>
		<details>
			<summary class="error-details__summary">
				<font-awesome-icon class="error-details__icon" icon="angle-right" />
				{{ $locale.baseText('nodeErrorView.details') }}
			</summary>
			<div class="error-details__content">
				<div v-if="error.context && error.context.causeDetailed">
					<el-card class="box-card" shadow="never">
						<div>
							{{ error.context.causeDetailed }}
						</div>
					</el-card>
				</div>
				<div v-if="error.timestamp">
					<el-card class="box-card" shadow="never">
						<template #header>
							<div class="clearfix box-card__title">
								<span>{{ $locale.baseText('nodeErrorView.time') }}</span>
							</div>
						</template>
						<div>
							{{ new Date(error.timestamp).toLocaleString() }}
						</div>
					</el-card>
				</div>
				<div
					v-if="error.context && error.context.itemIndex !== undefined"
					class="el-card box-card is-never-shadow el-card__body"
				>
					<span class="error-details__summary"
						>{{ $locale.baseText('nodeErrorView.itemIndex') }}:</span
					>
					{{ error.context.itemIndex }}
					<span v-if="error.context.runIndex">
						|
						<span class="error-details__summary"
							>{{ $locale.baseText('nodeErrorView.itemIndex') }}:</span
						>
						{{ error.context.runIndex }}
					</span>
					<span v-if="error.context.parameter">
						|
						<span class="error-details__summary"
							>{{ $locale.baseText('nodeErrorView.inParameter') }}:</span
						>
						{{ parameterDisplayName(error.context.parameter) }}
					</span>
				</div>
				<div v-if="error.httpCode">
					<el-card class="box-card" shadow="never">
						<template #header>
							<div class="clearfix box-card__title">
								<span>{{ $locale.baseText('nodeErrorView.httpCode') }}</span>
							</div>
						</template>
						<div>
							{{ error.httpCode }}
						</div>
					</el-card>
				</div>
				<div v-if="error.cause">
					<el-card class="box-card" shadow="never">
						<template #header>
							<div class="clearfix box-card__title">
								<span>{{ $locale.baseText('nodeErrorView.cause') }}</span>
								<br />
								<span class="box-card__subtitle">{{
									$locale.baseText('nodeErrorView.dataBelowMayContain')
								}}</span>
							</div>
						</template>
						<div>
							<div class="copy-button" v-if="displayCause">
								<n8n-icon-button
									@click="copyCause"
									:title="$locale.baseText('nodeErrorView.copyToClipboard')"
									icon="copy"
								/>
							</div>
							<vue-json-pretty
								v-if="displayCause"
								:data="error.cause"
								:deep="3"
								:showLength="true"
								selectableType="single"
								path="error"
								class="json-data"
							/>
							<span v-else>
								<font-awesome-icon icon="info-circle" />{{
									$locale.baseText('nodeErrorView.theErrorCauseIsTooLargeToBeDisplayed')
								}}
							</span>
						</div>
					</el-card>
				</div>
				<div v-if="error.stack">
					<el-card class="box-card" shadow="never">
						<template #header>
							<div class="clearfix box-card__title">
								<span>{{ $locale.baseText('nodeErrorView.stack') }}</span>
							</div>
						</template>
						<div>
							<pre><code>{{error.stack}}</code></pre>
						</div>
					</el-card>
				</div>
			</div>
		</details>
	</div>
</template>

<script lang="ts">
//@ts-ignore
import VueJsonPretty from 'vue-json-pretty';
import { copyPaste } from '@/mixins/copyPaste';
import { showMessage } from '@/mixins/showMessage';
import mixins from 'vue-typed-mixins';
import { MAX_DISPLAY_DATA_SIZE } from '@/constants';
import { INodeUi } from '@/Interface';

import type { INodeProperties, INodePropertyCollection, INodePropertyOptions } from 'n8n-workflow';
import { sanitizeHtml } from '@/utils';
import { mapStores } from 'pinia';
import { useNDVStore } from '@/stores/ndv';
import { useNodeTypesStore } from '@/stores/nodeTypes';

export default mixins(copyPaste, showMessage).extend({
	name: 'NodeErrorView',
	props: ['error'],
	components: {
		VueJsonPretty,
	},
	computed: {
		...mapStores(useNodeTypesStore, useNDVStore),
		displayCause(): boolean {
			return JSON.stringify(this.error.cause).length < MAX_DISPLAY_DATA_SIZE;
		},
		parameters(): INodeProperties[] {
			const node = this.ndvStore.activeNode;
			if (!node) {
				return [];
			}
			const nodeType = this.nodeTypesStore.getNodeType(node.type, node.typeVersion);

			if (nodeType === null) {
				return [];
			}

			return nodeType.properties;
		},
	},
	methods: {
		replacePlaceholders(parameter: string, message: string): string {
			const parameterName = this.parameterDisplayName(parameter, false);
			const parameterFullName = this.parameterDisplayName(parameter, true);
			return message
				.replace(/%%PARAMETER%%/g, parameterName)
				.replace(/%%PARAMETER_FULL%%/g, parameterFullName);
		},
		getErrorDescription(): string {
			if (!this.error.context || !this.error.context.descriptionTemplate) {
				return sanitizeHtml(this.error.description);
			}

			const parameterName = this.parameterDisplayName(this.error.context.parameter);
			return sanitizeHtml(
				this.error.context.descriptionTemplate.replace(/%%PARAMETER%%/g, parameterName),
			);
		},
		getErrorMessage(): string {
			const baseErrorMessage = this.$locale.baseText('nodeErrorView.error') + ': ';

			if (!this.error.context || !this.error.context.messageTemplate) {
				return baseErrorMessage + this.error.message;
			}

			const parameterName = this.parameterDisplayName(this.error.context.parameter);

			return (
				baseErrorMessage +
				this.error.context.messageTemplate.replace(/%%PARAMETER%%/g, parameterName)
			);
		},
		parameterDisplayName(path: string, fullPath = true) {
			try {
				const parameters = this.parameterName(this.parameters, path.split('.'));
				if (!parameters.length) {
					throw new Error();
				}

				if (fullPath === false) {
					return parameters.pop()!.displayName;
				}
				return parameters.map((parameter) => parameter.displayName).join(' > ');
			} catch (error) {
				return `Could not find parameter "${path}"`;
			}
		},
		parameterName(
			parameters: Array<INodePropertyOptions | INodeProperties | INodePropertyCollection>,
			pathParts: string[],
		): Array<INodeProperties | INodePropertyCollection> {
			let currentParameterName = pathParts.shift();

			if (currentParameterName === undefined) {
				return [];
			}

			const arrayMatch = currentParameterName.match(/(.*)\[([\d])\]$/);
			if (arrayMatch !== null && arrayMatch.length > 0) {
				currentParameterName = arrayMatch[1];
			}
			const currentParameter = parameters.find(
				(parameter) => parameter.name === currentParameterName,
			) as unknown as INodeProperties | INodePropertyCollection;

			if (currentParameter === undefined) {
				throw new Error(`Could not find parameter "${currentParameterName}"`);
			}

			if (pathParts.length === 0) {
				return [currentParameter];
			}

			if (currentParameter.hasOwnProperty('options')) {
				return [
					currentParameter,
					...this.parameterName((currentParameter as INodeProperties).options!, pathParts),
				];
			}

			if (currentParameter.hasOwnProperty('values')) {
				return [
					currentParameter,
					...this.parameterName((currentParameter as INodePropertyCollection).values, pathParts),
				];
			}

			// We can not resolve any deeper so lets stop here and at least return hopefully something useful
			return [currentParameter];
		},
		copyCause() {
			this.copyToClipboard(JSON.stringify(this.error.cause));
			this.copySuccess();
		},
		copySuccess() {
			this.$showMessage({
				title: this.$locale.baseText('nodeErrorView.showMessage.title'),
				type: 'info',
			});
		},
	},
});
</script>

<style lang="scss">
.error-header {
	margin-bottom: 10px;
}

.error-message {
	color: #ff0000;
	font-weight: bold;
	font-size: 1.1rem;
}

.error-description {
	margin-top: 10px;
	font-size: 1rem;
}

.error-details__summary {
	font-weight: 600;
	font-size: 16px;
	cursor: pointer;
	outline: none;
}

.error-details__icon {
	margin-right: 4px;
}

details > summary {
	list-style-type: none;
}

details > summary::-webkit-details-marker {
	display: none;
}

details[open] {
	.error-details__icon {
		transform: rotate(90deg);
	}
}

.error-details__content {
	margin-top: 15px;
}

.el-divider__text {
	background-color: var(--color-background-light);
}

.box-card {
	margin-top: 1em;
	overflow: auto;
}

.box-card__title {
	font-weight: 400;
}

.box-card__subtitle {
	font-weight: 200;
	font-style: italic;
	font-size: 0.7rem;
}

.copy-button {
	position: absolute;
	right: 50px;
	z-index: 1000;
}
</style>
