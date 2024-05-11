export function Footer() {
  return (
    <div className="relative bottom-0 mt-8 flex w-full justify-center border-t-2 border-slate-300/25 bg-inherit pb-8 pt-8">
      <div className="flex w-4/5 flex-col items-center gap-1 sm:flex-row sm:justify-between">
        <div>
          <a
            href="mailto:sospet.suporte@gmail.com"
            className="text-sm text-gray-500"
          >
            Suporte: sospet.suporte@gmail.com
          </a>
        </div>
        <div className="flex flex-col gap-1 text-center align-middle sm:text-left md:flex-row md:gap-8">
          <a className="text-sm text-gray-500">Termos de uso</a>
          <a className="text-sm text-gray-500">Políticas de privacidade</a>
        </div>
      </div>
    </div>
  );
}
