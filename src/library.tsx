import ObviousLogo from "./assets/logo.svg";
import { LibraryModal } from "./library-modal";

export const Library = () => {
  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        width: "100vw",
      }}
    >
      <div
        style={{
          width: "200px",
          borderRight: "1px solid #E4E7EC",
          padding: "8px",
        }}
      >
        <ObviousLogo />
      </div>
      <section>
        <LibraryModal />
      </section>
    </div>
  );
};
