/* export const extractLocalFromPathNAme =>(path) pathName?.split("/")[1];
 */

export const extractLocaleFromPathName = (pathName: string | null) => {
  return pathName?.split("/")[1];
};
