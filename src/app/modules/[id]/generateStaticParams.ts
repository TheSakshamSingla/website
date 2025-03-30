// This is required for static export
export const dynamic = "force-static";
export const revalidate = false;

// Generate static paths for build time
export async function generateStaticParams() {
  // In a real app, you would fetch all module IDs from your database
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' },
    { id: '4' },
    { id: '5' },
    { id: '6' }
  ];
}
