import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";
import AmazonLogo from "@/components/auth/AmazonLogo";
import AuthFooter from "@/components/auth/AuthFooter";

export const metadata = {
  title: "Recuperar senha | Amazon",
};

export default function EsqueciSenhaPage() {
  return (
    <div className="auth-page">
      <AmazonLogo />
      <ForgotPasswordForm />
      <AuthFooter />
    </div>
  );
}
