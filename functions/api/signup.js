export async function onRequestPost(context) {
  try {
    const data = await context.request.json();
    if (typeof data.email !== 'string' || typeof data.token !== 'string' || data.email.length > 254 || data.token.length > 4096) return Response.json({ok:false},{status:400});
    const response = await fetch(context.env.SIGNUP_RECEIVER_URL, {method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({email:data.email,token:data.token}),redirect:'follow'});
    const result = await response.json();
    return Response.json({ok:result.ok === true},{status:result.ok === true ? 200 : 400,headers:{'Cache-Control':'no-store'}});
  } catch (_) { return Response.json({ok:false},{status:503,headers:{'Cache-Control':'no-store'}}); }
}
