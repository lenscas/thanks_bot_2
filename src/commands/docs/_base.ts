export const create_documentation_url = (args: string[], base_url: string, mod_name: (_: string) => string): string => {
    const search = args[0];
    if (!search) {
        return 'Missing class name';
    }
    const moddedName = mod_name(search);
    return `documentation: <${base_url}${moddedName}.html>`;
};
