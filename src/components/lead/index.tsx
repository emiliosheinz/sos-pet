import { Button } from "~/components/ui/button";

export function Lead() {
  return (
    <div className="mt-8 flex items-center justify-center gap-4 bg-gray-300 px-3 py-8 lg:gap-12">
      <p>Compartilhe conosco seu feedback</p>
      <a
        href="https://docs.google.com/forms/d/e/1FAIpQLSd2cVD5TXhV2dUi8NpEWPHavuNnXsAhRMCn61V8O8DKSqks3g/viewform?embedded=true"
        target="_blank"
      >
        <Button>Responda a pesquisa</Button>
      </a>
    </div>
  );
}
