import LoginForm from "@/components/forms/LoginForm";
import Image from "next/image";
import Link from "next/link";
export default function Home() {
  
  return (
    <div className="flex h-screen max-h-screen">
      {/* Todo: OTP verification | passkey model */}
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-[496px:">
          <Image
            src={"/assets/icons/logo-full.svg"}
            width={1000}
            height={1000}
            alt="patient"
            className="mb-12 h-10 w-fit"
          />
          <LoginForm />
          <div className="text-14-regular mt-20 flex justify-between">
            <p className="justify-items-end text-dark-600 xl:text-left">
              © 2024 AVM Care
            </p>
            <Link href={"/admin"} className="text-green-500">
              Admin
            </Link>
          </div>
        </div>
      </section>

      <Image 
      src={'/assets/images/onboarding-img.png'}
      alt="patient"
      height={1000}
      width={1000}
      className="side-img max-w[50%]" />
    </div>
  );
}
