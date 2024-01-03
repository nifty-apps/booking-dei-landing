// pageUtils.js or similar file
import { makeStaticProps } from "~/lib/getStatic";

export function withPageStaticProps(
  PageComponent,
  options = { namespaces: ["common"] }
) {
  const getStaticProps = makeStaticProps(options.namespaces);

  return {
    Page: PageComponent,
    getStaticProps,
  };
}
