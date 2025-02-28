import { SignUp } from "@clerk/nextjs";

type SignUpPageProps = {
    searchParams?: { [key: string]: string | string[] };
};

export default function SignUpPage({ searchParams }: SignUpPageProps) {
    const redirectUrl = Array.isArray(searchParams?.redirectUrl)
        ? searchParams?.redirectUrl[0]
        : searchParams?.redirectUrl;

    return (
        <div className="flex items-center justify-center min-h-screen text-white font-sans">
            <SignUp
                path="/sign-up"
                routing="path"
                signInUrl="/sign-in"
                fallbackRedirectUrl={redirectUrl || "/"}
                signInFallbackRedirectUrl={redirectUrl || "/"}
            />
        </div>
    );
}
