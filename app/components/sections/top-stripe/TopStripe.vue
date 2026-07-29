<template>
	<div class="top-stripe">
		<div class="top-stripe__container">
			<div class="top-stripe__left">
				<span class="top-stripe__status">
					<span class="top-stripe__pulse"/>
					<span class="top-stripe__text top-stripe__text--desktop">Производство работает • 24/7</span>
					<span class="top-stripe__text top-stripe__text--mobile">24/7</span>
				</span>
				<span class="top-stripe__cert top-stripe__cert--desktop">
					<Icon name="tabler:shield-check"/>
					Сертификат ГОСТ Р 50577-2018
				</span>
			</div>
			<div class="top-stripe__right">
				<a
					href="#"
					class="top-stripe__location top-stripe__location--desktop"
				>
					<Icon name="tabler:map-pin"/>
					Москва, ул. Производственная 12к3
				</a>
				<a href="tel:88002001234" class="top-stripe__phone">
					<Icon name="tabler:phone"/>
					8 800 200-12-34
				</a>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	console.debug('TopStripe:mount');
</script>
