import { LoginGoogleButton } from "@/components/login-button";

export default function SignInPage() {
    return (
        <div className="flex min-h-screen items-center justify-center">
            <div className="w-full max-w-md p-8 space-y-4 bg-white rounded-lg shadow">
                <h1 className="text-2xl font-bold text-center">Sign In</h1>
                <LoginGoogleButton />

                {/* Atau redirect langsung ke backend auth */}
                <div className="text-center">
                    <a
                        href="http://localhost:3001/api/auth/signin"
                        className="text-blue-600 hover:underline"
                    >
                        Or sign in directly via backend
                    </a>
                </div>
            </div>
        </div>
    );
}