# goldPoint

## 命令介绍

### 校验代码规范

`npm run lint`

### 发布到私有源

1. 安装私有源版本工具

    `npm install -g snpm`

2. 登陆私有源

    `snpm addUser`

3. 发布包到私有源上

    `npm run release`

**注：上述1-2步骤不需要每次都操作，操作一次即可**

算法指标对照

|参数 | 规则或名称 | 解释
|----|----|----
| fps | first-paint-start, | 黄金指标
| fpd | first-paint-end, | 黄金指标
| fcps | first-contentful-paint-start, | 黄金指标
| fcpd | first-contentful-paint-end, | 黄金指标
| lcps | largest-contentful-paint-start, | 黄金指标
| lcpd | largest-contentful-paint-end, | 黄金指标
| facres | first-valid-interface-start, | 第一个接口请求 开始
| facred | first-valid-interface-end | 第一个接口请求完成时间
| tti | domInteractive - fetchStart | 可见可操作时间
| fmp | renderingstart - renderingend| 页面渲染绘制时间
| fsp | lcp - fetchStart | 首次超过屏幕高度的速度
| pdes | fetchStart - navigationStart | page destruction duration 上个页面销毁时间
| dnsa | domainLookupEnd - domainLookupStart | dns analysis duration
| tcpl | connectEnd - connectStart | tcp link  duration
| sert | responseStart - requestStart | Server response duration
| ctxt | responseEnd - responseStart | context text get duration
| pdom | domLoading - responseEnd | before domloading duration
| pact | domInteractive - domLoading | before domInteractive duration
| domc | domComplete - domInteractive | domcomplete  duration
| doma | domComplete - domLoading |  domLoading total duration
| domt | domComplete - fetchStart | all group duration
| pn | project-name | 项目名称
| rt | router-path | 路由路径