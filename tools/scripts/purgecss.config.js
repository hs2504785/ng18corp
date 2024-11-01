const sourceDir = 'dist/apps/rochlab/browser';

module.exports = {
  content: [`${sourceDir}/index.html`, `${sourceDir}/*.js`],
  css: [`${sourceDir}/*.css`],
  output: sourceDir,
  safelist: {
    standard: [],
    deep: [],
    greedy: [],
  },
};
