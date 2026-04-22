export const dynamic = "force-dynamic";

export async function GET() {
  return Response.json({
    hasWooUrl: !!process.env.NEXT_PUBLIC_WOO_URL,
    hasWpUsername: !!process.env.WP_APP_USERNAME,
    hasWpPassword: !!process.env.WP_APP_PASSWORD,
    wpUsernameLength: process.env.WP_APP_USERNAME?.length ?? 0,
    wpPasswordLength: process.env.WP_APP_PASSWORD?.length ?? 0,
    fetchTest: await testFetch(),
  });
}

async function testFetch() {
  const WOO_URL = process.env.NEXT_PUBLIC_WOO_URL;
  const user = process.env.WP_APP_USERNAME;
  const pass = process.env.WP_APP_PASSWORD;

  if (!WOO_URL || !user || !pass) {
    return { error: "Missing env vars" };
  }

  const credentials = Buffer.from(`${user}:${pass}`).toString("base64");

  try {
    const res = await fetch(`${WOO_URL}/wp-json/wc/store/v1/products?per_page=1`, {
      headers: {
        Authorization: `Basic ${credentials}`,
        "User-Agent": "Mozilla/5.0 (compatible; EnviroAqua-Storefront/1.0)",
        Accept: "application/json",
      },
      cache: "no-store",
    });
    return {
      status: res.status,
      statusText: res.statusText,
      cfRay: res.headers.get("cf-ray"),
      server: res.headers.get("server"),
      bodyPreview: (await res.text()).slice(0, 200),
    };
  } catch (e) {
    return { error: String(e) };
  }
}
