 //nothing suspicious here 👀
(function () 
{
  "use strict";
  var _0xSysRef = [
    "WVdSdGFXNWZZV05qWlhOeg==", 
    "SGlkZGVuIExvZ2lj",       
    "ZmxhZw==",                 
  ];
  var _seg = [
  [67, 84, 70, 123],                  
  [116, 104, 51],                     
  [95, 98, 114, 48, 119, 115, 51, 114], 
  [95, 49, 115],                      
  [95, 110, 48, 116],                
  [95, 115, 51, 99, 117, 114, 51],    
  [125]                              
];

  
  function _decodeMeta(idx) {
    try {
      return atob(_0xSysRef[idx]);
    } catch (e) {
      return "";
    }
  }
  function _assembleToken() {
    return _seg
      .map(function (block) {
        return block.map(function (c) {
          return String.fromCharCode(c);
        }).join("");
      })
      .join("");
  }
  function _sha256(str) {
    var buf = new TextEncoder().encode(str);
    return crypto.subtle.digest("SHA-256", buf).then(function (hashBuf) {
      return Array.from(new Uint8Array(hashBuf))
        .map(function (b) { return b.toString(16).padStart(2, "0"); })
        .join("");
    });
  }
  var _ref = "129589a884d88f3dc379505bb51509b9728ca8a634e068bbaebf6b58dc894b80";
  window.check = function check(code) {
    if (code.indexOf("_") !== -1) {
      return Promise.resolve(false); 
    }
    return _sha256(code).then(function (digest) {
      return digest === _ref;
    });
  };
  document.addEventListener("DOMContentLoaded", function () {
    var btn    = document.getElementById("submit-btn");
    var input  = document.getElementById("code-input");
    var result = document.getElementById("result");

    function flash(el, type) {
      el.classList.remove("success", "error");
      void el.offsetWidth;
      el.classList.add(type);
    }
    btn.addEventListener("click", function () {
      var val = input.value.trim();
      if (!val) return;

      check(val).then(function (passed) {
        if (passed) {
          flash(result, "success");
          result.textContent = "Flag: " + _assembleToken();
        } else {
          if (val === atob(atob("WVdSdGFXNWZZV05qWlhOeg=="))) {
            flash(result, "warn");
            result.textContent = "\u26a0 You\u2019re on the right path \u2014 keep grinding. Something in the logic is fighting you.";
          } else {
            flash(result, "error");
            result.textContent = "\u2717 Access denied. Code invalid.";
          }
        }
      });
    });
    input.addEventListener("keydown", function (e) {
      if (e.key === "Enter") btn.click();
    });
  });
})();