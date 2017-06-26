const postcss = require("postcss");
const cssnano = require("cssnano");

const csspretty = postcss([
    function(css) {
        css.walk(node => {
            if (["rule", "atrule"].indexOf(node.type) >= 0) {
                node.raws.semicolon = true;
            }
        });
    },
]);

const line_breaking_stringifier = (node, builder) => {

    let out = "";
    let lineStart = 0;

    postcss.stringify(node, (text, node, type) => {

        out += text;
        const nt = node && node.type;

        if (out.length - lineStart > 512
            && ((nt === "rule" && type === "end")
            || (nt === "atrule" && (text.startsWith("@media") || type === "end")))) {

            out += "\n";
            lineStart = out.length;
        }
    });

    builder(out);

};

module.exports.default = function(css) {

    const loaderCallback = this.async();

    cssnano.process(css, { discardComments: { removeAll: true } }).then(result =>

        csspretty.process(result.css, { stringifier: line_breaking_stringifier }).then(result =>

            loaderCallback(null, result.css)
        )
    );
};
