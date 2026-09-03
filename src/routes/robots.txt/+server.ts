import type { RequestHandler } from './$types';

// Cloud Run gir hver tjeneste en offentlig *.run.app-adresse i tillegg til det
// ekte domenet. Den svarer 200 og er fullt indekserbar, så uten dette blir
// speil-hosten et konkurrerende duplikat av jessetree.xyz i søk. Samme lekkasje
// som ble ryddet i GSC i juli — her stenges den ved kilden.
//
// Ikke-kanoniske hoster (run.app-speilet) får Disallow: /. Det ekte domenet
// slipper alt inn. Hosten leses fra requesten, så ingen domener hardkodes ut
// over unntaket.
// Ingen Sitemap-linje her ennå: /sitemap.xml finnes ikke, og å peke på en 404
// er verre enn å la være. Legges inn samtidig som sitemapen bygges.
export const GET: RequestHandler = ({ request }) => {
	const host = (request.headers.get('host') ?? '').toLowerCase();
	const isMirror = host.endsWith('.run.app');

	const body = isMirror
		? 'User-agent: *\nDisallow: /\n'
		: 'User-agent: *\nAllow: /\n';

	return new Response(body, {
		headers: {
			'content-type': 'text/plain; charset=utf-8',
			'cache-control': 'public, max-age=3600'
		}
	});
};
