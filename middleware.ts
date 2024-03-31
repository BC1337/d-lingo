import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
    publicRoutes: ['/'],
});

export const config = {
  matcher: ["/((?!.+\\.(?:svg|\\w)+$|_next).*)", "/", "/(api|trpc)(.*)"],
};