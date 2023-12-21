"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var __getOwnPropNames = Object.getOwnPropertyNames;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// utils/index.ts
var _cheerio = require('cheerio'); var _cheerio2 = _interopRequireDefault(_cheerio);
var analayse;
var init_utils = __esm({
  "utils/index.ts"() {
    "use strict";
    analayse = (vocab, response) => {
      const $ = _cheerio2.default.load(response.data);
      const title = $("div.di-title:first>span>span").text();
      vocab.title = title;
      const pos = $(
        "div.posgram.dpos-g.hdib.lmr-5:first span.pos.dpos"
      ).text();
      const dpos = $(
        "div.posgram.dpos-g.hdib.lmr-5:first span.gram.dgram"
      ).text();
      vocab.pos = pos;
      vocab.dpos = dpos;
      const uk_pron = $("span.uk.dpron-i:first span.ipa.dipa.lpl-1").text();
      const us_pron = $("span.us.dpron-i:first span.ipa.dipa.lpl-1").text();
      vocab.uk_pron = uk_pron;
      vocab.us_pron = us_pron;
      $("div.def-block.ddef_block").each((i, elem) => {
        const description = $(elem).find("div.def.ddef_d.db").text();
        vocab.definitions.push({ description, examples: [] });
        const subList = $(elem).find(
          "div.def-body.ddef_b div.examp.dexamp"
        );
        if (subList.length !== 0) {
          subList.each((j, item) => {
            vocab.definitions[i].examples.push($(item).text());
          });
        }
      });
      $("#dataset-example").find("div.lbb.lb-cm.lpt-10").each((i, elem) => {
        const dataExample = $(elem).find("span.deg").text().trim().replace(/\n/g, "");
        vocab.dataset_examples.push(dataExample);
      });
      console.log("vocab :>> ", vocab);
      return vocab;
    };
  }
});

// routes/cambridge.ts
var _express = require('express'); var _express2 = _interopRequireDefault(_express);
var _axios = require('axios'); var _axios2 = _interopRequireDefault(_axios);
var router, cambridge_default;
var init_cambridge = __esm({
  "routes/cambridge.ts"() {
    "use strict";
    init_utils();
    router = _express2.default.Router();
    router.get("/cambridge", (req, res, next) => __async(void 0, null, function* () {
      const word = req.query.q;
      const requestURL = `https://dictionary.cambridge.org/dictionary/english/${word}/`;
      const vocab = {
        title: "",
        pos: "",
        dpos: "",
        uk_pron: "",
        us_pron: "",
        definitions: [],
        dataset_examples: []
      };
      _axios2.default.get(requestURL, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
        }
      }).catch((error) => {
        console.log("error from remote server:>> ", error);
        next(error);
      }).then((response) => {
        if (response.status !== 200) {
          return res.status(503).send("Service unavailable.");
        }
        const result = analayse(vocab, response);
        console.log("result :>> ", result);
        if (result.definitions.length === 0)
          return res.status(404).send("Word not found.");
        return res.status(200).send(result);
      });
    }));
    cambridge_default = router;
  }
});

// index.ts

var _cors = require('cors'); var _cors2 = _interopRequireDefault(_cors);
var require_server = __commonJS({
  "index.ts"() {
    init_cambridge();
    var routes = [cambridge_default];
    var app = _express2.default.call(void 0, );
    app.use(_cors2.default.call(void 0, ));
    var port = 7001;
    routes.forEach((route) => {
      app.use(route);
    });
    app.get("/", (req, res) => {
      res.send("Welcome to Memoraiya Server-side!");
    });
    app.use((err, req, res, next) => {
      res.status(500).send(err.message);
      next();
    });
    app.listen(port, () => {
      console.log(`\u26A1\uFE0F[server]: Server is running at http://localhost:${port}`);
    });
  }
});
exports. default = require_server();
//# sourceMappingURL=index.js.map