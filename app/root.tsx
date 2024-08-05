import {
  json,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import { cssBundleHref } from "@remix-run/css-bundle";
import type { LinksFunction, LoaderFunction } from "@remix-run/node";
import "./styles/global.css";
import { darkTheme, lightTheme } from "app/styles/theme.css";
import clsx from "clsx";
import { getThemeFromCookies } from "app/utils/theme.server";
import { ToggleThemeButton } from "app/components/themeSwitcher";
import { SvgSprite } from "app/components/svgSprite";

export const links: LinksFunction = () => [
  {
    rel: "stylesheet",
    href: "fonts/fonts.css",
  },
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
];

export const loader: LoaderFunction = async ({ request }) => {
  const theme = await getThemeFromCookies(request);

  return json({ theme });
};

export function Layout({ children }: { children: React.ReactNode }) {
  const data = useLoaderData<{ theme: string }>();

  return (
    <html
      lang="en"
      className={clsx(darkTheme, { [lightTheme]: data?.theme === "light" })}
    >
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <SvgSprite />

        {children}
        <ToggleThemeButton currentTheme={data.theme} />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
