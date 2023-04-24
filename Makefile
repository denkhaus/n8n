
sync_directus_node:
	@cp -r ./packages/nodes-base/nodes/Directus ../extensions/n8n-nodes-directus/nodes
	@cp -r ./packages/nodes-base/credentials/DirectusApi.credentials.ts ../extensions/n8n-nodes-directus/credentials