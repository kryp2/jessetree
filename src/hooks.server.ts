import type { Handle } from '@sveltejs/kit';

// Flåtemønster «død www»: 301 fra www.<domene> til https://<domene>,
// med path og query bevart. Generisk stripping — hardkoder ikke domene,
// slik at alle nåværende og fremtidige domener dekkes.
// Unntak: health-endepunkter og *.run.app-hosten (Cloud Run-prober).
const HEALTH_PATHS = new Set(['/health', '/healthz', '/_ah/health']);

export const handle: Handle = async ({ event, resolve }) => {
	const host = (event.request.headers.get('host') ?? '').toLowerCase();
	if (
		host.startsWith('www.') &&
		!host.endsWith('.run.app') &&
		!HEALTH_PATHS.has(event.url.pathname)
	) {
		return new Response(null, {
			status: 301,
			headers: { location: `https://${host.slice(4)}${event.url.pathname}${event.url.search}` }
		});
	}
	return resolve(event);
};
