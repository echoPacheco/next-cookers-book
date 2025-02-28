import { SignIn } from "@clerk/nextjs";

type SignInPageProps = {
    searchParams?: { [key: string]: string | string[] };
};

export default function SignInPage({ searchParams }: SignInPageProps) {
    const redirectUrl = Array.isArray(searchParams?.redirectUrl)
        ? searchParams?.redirectUrl[0]
        : searchParams?.redirectUrl;

    return (
        <div className="flex items-center justify-center min-h-screen text-white font-sans">
            <SignIn
                path="/sign-in"
                routing="path"
                signUpUrl="/sign-up"
                fallbackRedirectUrl={redirectUrl || "/"}
                signUpFallbackRedirectUrl={redirectUrl || "/"}
            />
        </div>
    );
}
