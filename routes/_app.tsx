import { type PageProps } from "$fresh/server.ts";
export default function AppLayout({ Component }: PageProps) {
  return (
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0" />
        <title>Legions Imperialis List Builder</title>
        <link rel="stylesheet" href="/styles.css" />
      </head>
      <body>
        <Component />
      </body>
    </html>
  );
}
