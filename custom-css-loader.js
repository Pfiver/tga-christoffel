const postcss = require("postcss");
const cssnano = require("cssnano");

module.exports.default = function(css) {

    // console.log("OK - my-loader was called w/ \"" + css.substring(0, 99) + "\"");

    const callback = this.async();

    const post = postcss([

        function(css) {

            // console.log("OK - postcss was called  w/ \"" + ("" + css).substring(0, 99) + "\"");

            // console.log("OK - postcss was called");

            css.walk(node => {
                if (["rule", "atrule"].indexOf(node.type) >= 0) {
                    // node.raws.before = "\n";
                    // node.raws.after = ";";
                    node.raws.semicolon = true;
                }
                else if (node.type === "comment") {
                    // node.remove();
                }
                else {
                    // console.log(node.type);
                }
            });

            callback(null, css.toString((node, builder) => {

                // console.log(`node: ${node.type}`);

                let out = "";
                const myBuilder = (text, node, type) => {

                    out += text;
                    // builder(text, node, type);
                };

                let lineStart = 0;
                postcss.stringify(node, (text, node, type) => {

                    const nodeType = node && node.type;

                    // console.log(`text: ${text}`);
                    // console.log(`nodeType: ${nodeType}`);
                    // console.log(`type: ${type}`);
                    // console.log(`len: ${out.length}`);

                    const lineLen = out.length - lineStart;

                    let br = false;

                    if (lineLen > 512
                        && ((nodeType === "rule" && type === "end")
                            || (nodeType === "atrule" && (text.startsWith("@media") || type === "end")))) {
                        text += "\n";
                        br = true;
                    }

                    myBuilder(text, node, type);

                    if (br) {
                        lineStart = out.length;
                    }
                });

                builder(out);

            }));

        },

    ]);

    const result = { css: css };

    cssnano.process(css, { discardComments: { removeAll: true } }).then(result =>

            post.process(result.css)

            // post.process(result.css).then(result =>
            //
            //     callback(null, result.css)
            //
            // )
    );

};
