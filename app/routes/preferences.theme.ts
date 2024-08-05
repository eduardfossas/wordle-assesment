import { ActionFunction } from "@remix-run/node";
import { themeCookie } from "~/utils/theme.server";
import { redirectBack } from "app/utils/server";

export const action: ActionFunction = async ({ request }) => {
    const form = await request.formData()
    const theme = form.get('theme')
  
    return redirectBack(request, {
      fallback: '/',
      headers: {
        'Set-Cookie': await themeCookie.serialize(theme)
      }
    })
  }