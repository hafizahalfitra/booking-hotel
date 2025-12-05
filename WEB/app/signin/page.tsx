import { LoginGoogleButton } from "@/components/login-button";

export default function SignInPage() {
    return (
        <div className="flex min-h-screen items-center justify-center">
            <div className="w-full max-w-md p-8 space-y-4 bg-white rounded-lg shadow">
                <h1 className="text-2xl font-bold text-center">Sign In</h1>
                <LoginGoogleButton />
            </div>
        </div>
    );
}