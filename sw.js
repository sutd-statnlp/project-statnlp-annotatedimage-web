importScripts('workbox-sw.prod.v2.1.2.js');

/**
 * DO NOT EDIT THE FILE MANIFEST ENTRY
 *
 * The method precache() does the following:
 * 1. Cache URLs in the manifest to a local cache.
 * 2. When a network request is made for any of these URLs the response
 *    will ALWAYS comes from the cache, NEVER the network.
 * 3. When the service worker changes ONLY assets with a revision change are
 *    updated, old cache entries are left as is.
 *
 * By changing the file manifest manually, your users may end up not receiving
 * new versions of files because the revision hasn't changed.
 *
 * Please use workbox-build or some other tool / approach to generate the file
 * manifest which accounts for changes to local files and update the revision
 * accordingly.
 */
const fileManifest = [
  {
    "url": "404.html",
    "revision": "6f2c6888e9f517bf8389b3622a5fcea7"
  },
  {
    "url": "app/app-7a913151fb.js",
    "revision": "7a913151fb5e2cd76bbe521f9d9f73f7"
  },
  {
    "url": "app/vendor-cb275b852b.js",
    "revision": "cb275b852bc9f26e9ac15a4d2a90ab87"
  },
  {
    "url": "content/css/main-f538e93ca9.css",
    "revision": "f538e93ca93216ec056bab0f77f2d6d4"
  },
  {
    "url": "content/css/vendor-f05d0565f7.css",
    "revision": "f05d0565f71f51dd1862a36ac9c85b67"
  },
  {
    "url": "content/fonts/glyphicons-halflings-regular-8988968814.svg",
    "revision": "89889688147bd7575d6327160d64e760"
  },
  {
    "url": "content/images/demo-556a3f4f9b.png",
    "revision": "556a3f4f9b47eaa6ed1b0a0aa41204a3"
  },
  {
    "url": "content/images/demo2x-556a3f4f9b.png",
    "revision": "556a3f4f9b47eaa6ed1b0a0aa41204a3"
  },
  {
    "url": "content/images/log-demo-556a3f4f9b.png",
    "revision": "556a3f4f9b47eaa6ed1b0a0aa41204a3"
  },
  {
    "url": "index.html",
    "revision": "9d74d0631781d6b46d3a4a8622e6c91f"
  },
  {
    "url": "plugins/ckeditor/plugins/preview/preview.html",
    "revision": "b114be6b4f9b5535382d13b6641d1f34"
  },
  {
    "url": "plugins/ckeditor/plugins/wsc/dialogs/ciframe.html",
    "revision": "d4d05b10153f28020a88128f3247f9a1"
  },
  {
    "url": "plugins/ckeditor/plugins/wsc/dialogs/tmpFrameset.html",
    "revision": "3a7bbc459fb65364e0902bc113b4aadd"
  },
  {
    "url": "plugins/ckeditor/samples/index.html",
    "revision": "a6dedc793b9211d980bf7c301db516ec"
  },
  {
    "url": "plugins/ckeditor/samples/old/ajax.html",
    "revision": "544d305a166a36da38e7bf71940b0f1e"
  },
  {
    "url": "plugins/ckeditor/samples/old/api.html",
    "revision": "61a46e67b5a27e4b8405f5905962bde6"
  },
  {
    "url": "plugins/ckeditor/samples/old/appendto.html",
    "revision": "c6dd6ff097ea84d8157ecbe59859808d"
  },
  {
    "url": "plugins/ckeditor/samples/old/autogrow/autogrow.html",
    "revision": "5659d9ce194ab69525e9e5a2f005bf29"
  },
  {
    "url": "plugins/ckeditor/samples/old/bbcode/bbcode.html",
    "revision": "ca46b32a134205812ee269652fb2b8a3"
  },
  {
    "url": "plugins/ckeditor/samples/old/codesnippet/codesnippet.html",
    "revision": "5961d4c2d4df1da5fade089a20fe15c1"
  },
  {
    "url": "plugins/ckeditor/samples/old/datafiltering.html",
    "revision": "c81031da50ebedf6adf5d8dca161148c"
  },
  {
    "url": "plugins/ckeditor/samples/old/devtools/devtools.html",
    "revision": "0873f20b422980a8919aaed3b3c27e9b"
  },
  {
    "url": "plugins/ckeditor/samples/old/dialog/dialog.html",
    "revision": "2b56424887f82cd0cc2c9f25b8116495"
  },
  {
    "url": "plugins/ckeditor/samples/old/divarea/divarea.html",
    "revision": "e8be54176f94ce69a69eae34d1de2fe0"
  },
  {
    "url": "plugins/ckeditor/samples/old/divreplace.html",
    "revision": "f9784867cc4050a7f185a7c564b948e0"
  },
  {
    "url": "plugins/ckeditor/samples/old/docprops/docprops.html",
    "revision": "8aacc1006f1c4ee868df2ea588d0292c"
  },
  {
    "url": "plugins/ckeditor/samples/old/enterkey/enterkey.html",
    "revision": "c1e1f64bb220cf3ed199354132a6cba0"
  },
  {
    "url": "plugins/ckeditor/samples/old/htmlwriter/outputforflash.html",
    "revision": "b6e986061f0f64d487c0b9a02d7741b3"
  },
  {
    "url": "plugins/ckeditor/samples/old/htmlwriter/outputhtml.html",
    "revision": "d4b4024f4b16475eebfe7285bfbc7207"
  },
  {
    "url": "plugins/ckeditor/samples/old/image2/image2.html",
    "revision": "58d33dc03aad39db22b5f96386696739"
  },
  {
    "url": "plugins/ckeditor/samples/old/index.html",
    "revision": "ecaeaa3eff58ef32e5fda65d52b2da8f"
  },
  {
    "url": "plugins/ckeditor/samples/old/inlineall.html",
    "revision": "274997e9115a24eebac72e69d3469a47"
  },
  {
    "url": "plugins/ckeditor/samples/old/inlinebycode.html",
    "revision": "8cce945d23ecad9cb834a9949f056daa"
  },
  {
    "url": "plugins/ckeditor/samples/old/inlinetextarea.html",
    "revision": "300341d4737c9122bc449218d0a2f559"
  },
  {
    "url": "plugins/ckeditor/samples/old/jquery.html",
    "revision": "ac89b6c813eecc236c8fe38b935c01e3"
  },
  {
    "url": "plugins/ckeditor/samples/old/magicline/magicline.html",
    "revision": "31c53949cc0c00e65fc9260b8f4d1b9d"
  },
  {
    "url": "plugins/ckeditor/samples/old/mathjax/mathjax.html",
    "revision": "9dd9fefb0e95615bb2d655bf4891bd3e"
  },
  {
    "url": "plugins/ckeditor/samples/old/placeholder/placeholder.html",
    "revision": "83de387031fbb09b648514816a0c33f2"
  },
  {
    "url": "plugins/ckeditor/samples/old/readonly.html",
    "revision": "f03a821ed41b6234dd192d9e90104b90"
  },
  {
    "url": "plugins/ckeditor/samples/old/replacebyclass.html",
    "revision": "724b9dba93871512100312d685ca3459"
  },
  {
    "url": "plugins/ckeditor/samples/old/replacebycode.html",
    "revision": "5d3164ed619ae23bb91351d077394805"
  },
  {
    "url": "plugins/ckeditor/samples/old/sharedspace/sharedspace.html",
    "revision": "08052f4ba4debccff5918cd2797d15a6"
  },
  {
    "url": "plugins/ckeditor/samples/old/sourcedialog/sourcedialog.html",
    "revision": "db9b53fa5e476ddda391c32dee626b33"
  },
  {
    "url": "plugins/ckeditor/samples/old/stylesheetparser/stylesheetparser.html",
    "revision": "323dba558f79c3d8b9e1cb568a81a847"
  },
  {
    "url": "plugins/ckeditor/samples/old/tabindex.html",
    "revision": "53e93942640a35677c6ff9b985b37e46"
  },
  {
    "url": "plugins/ckeditor/samples/old/tableresize/tableresize.html",
    "revision": "65f598f534fd2eeaaa07da70dc90c349"
  },
  {
    "url": "plugins/ckeditor/samples/old/toolbar/toolbar.html",
    "revision": "8368a2b3df1618201f2607c6461474e0"
  },
  {
    "url": "plugins/ckeditor/samples/old/uicolor.html",
    "revision": "bf2038a314dd4222d49e7266553b50bf"
  },
  {
    "url": "plugins/ckeditor/samples/old/uicolor/uicolor.html",
    "revision": "12ccffcd4102fdd6e5020254440e3f58"
  },
  {
    "url": "plugins/ckeditor/samples/old/uilanguages.html",
    "revision": "c5fc9d97106f0fda1e4d18f0fc20156a"
  },
  {
    "url": "plugins/ckeditor/samples/old/wysiwygarea/fullpage.html",
    "revision": "1617bb72e1242df7aece4fb408ec8ca6"
  },
  {
    "url": "plugins/ckeditor/samples/old/xhtmlstyle.html",
    "revision": "145636bd20e3f8204ea10d0d9fdde34b"
  },
  {
    "url": "plugins/ckeditor/samples/toolbarconfigurator/index.html",
    "revision": "842e8244ba33e32e50de390dbdbba804"
  },
  {
    "url": "plugins/morrisjs/spec/specs.html",
    "revision": "40e0b682fe6c286d2ec30c2414bb0fff"
  },
  {
    "url": "plugins/morrisjs/spec/viz/test.html",
    "revision": "a197caddc9ddbc9df9cb2dfacc8b6ae9"
  }
];

const workboxSW = new self.WorkboxSW();
workboxSW.precache(fileManifest);
