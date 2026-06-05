import LoginForm from "@/components/auth/LoginForm";
import AmazonLogo from "@/components/auth/AmazonLogo";
import AuthFooter from "@/components/auth/AuthFooter";

export const metadata = {
  title: "Login | Amazon",
};

export default function LoginPage() {
  return (
    <div className="auth-page">
      <AmazonLogo />
      <LoginForm />
      <AuthFooter />
    </div>
  );
}
