import { Suspense } from "react";
import CompleteAuth from "./completeAuth";

const Page = () => (
  <Suspense fallback={<div>Cargando...</div>}>
    <CompleteAuth />
  </Suspense>
);

export default Page;
