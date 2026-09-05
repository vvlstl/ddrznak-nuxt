<template>
	<div
		class="flag"
		:class="{'flag--raised': isRaisedFlag}"
	>
		<div class="flag__text">RUS</div>
		<svg
			v-if="flag"
			class="flag__icon"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 25 15"
			width="25"
			height="15"
		>
			<rect x="0" y="0" width="25" height="5" fill="#FFFFFF"/>
			<rect x="0" y="5" width="25" height="5" fill="#0000FF"/>
			<rect x="0" y="10" width="25" height="5" fill="#FF0000"/>
			<rect
				x="0" y="0" width="25" height="15" rx="1"
				fill="none"
				stroke="#000"
				stroke-width="2"
			/>
		</svg>
	</div>
</template>
<script setup lang="ts">
	defineProps<{
		flag?: boolean;
		isRaisedFlag?: boolean;
	}>();
</script>