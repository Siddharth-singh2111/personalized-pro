'use client';

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase/config";

 const withAuth = (Component: React.FC) => {
  return function AuthenticatedComponent(props: any) {
    const router = useRouter();

    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (!user) {
          router.replace("/login"); // redirect if not logged in
        }
      });

      return () => unsubscribe();
    }, []);

    return <Component {...props} />;
  };
};
export default withAuth;