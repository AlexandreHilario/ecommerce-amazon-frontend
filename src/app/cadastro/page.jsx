import RegisterForm from "@/components/auth/RegisterForm";
import AmazonLogo from "@/components/auth/AmazonLogo";
import AuthFooter from "@/components/auth/AuthFooter";

export const metadata = {
  title: "Criar conta | Amazon",
};

export default function CadastroPage() {
  return (
    <div className="auth-page">
      <AmazonLogo />
      <RegisterForm />
      <AuthFooter />
    </div>
  );
}
