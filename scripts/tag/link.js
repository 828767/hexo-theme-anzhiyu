const urlFor = require("hexo-util").url_for.bind(hexo);
function link(args) {
  const themeConfig = hexo.theme.config;
  args = args.join(" ").split(",");
  let title = args[0];
  let sitename = args[1];
  let link = args[2];
  let imgUrl = args[3] || "";
  let favicon = themeConfig.favicon;

  // 删除头尾空白符
  link = link.trim();
  imgUrl = imgUrl.trim();
  favicon = favicon.trim();

  // 链接指定为有效URL视为站外，其他相对路径等视为站内
  try {
    new URL(link);
    InsideStation = false;
  } catch (err) {
    InsideStation = true;
  }

  return `<div calss='anzhiyu-tag-link'><a class="tag-Link" target="_blank" href="${urlFor(link)}">
    <div class="tag-link-tips">${
      InsideStation ? "站内地址" : "引用站外地址"
    }</div>
    <div class="tag-link-bottom">
        <div class="tag-link-left" style="${
          imgUrl
            ? `background-image: url(${InsideStation ? favicon : imgUrl})`
            : ""
        }">
          <i class="anzhiyufont anzhiyu-icon-link" style="${
            imgUrl ? "display: none" : ""
          }"></i>
        </div>
        <div class="tag-link-right">
            <div class="tag-link-title">${title}</div>
            <div class="tag-link-sitename">${sitename}</div>
        </div>
        <i class="anzhiyufont anzhiyu-icon-angle-right"></i>
    </div>
    </a></div>`;
}

hexo.extend.tag.register("link", link, { ends: false });
