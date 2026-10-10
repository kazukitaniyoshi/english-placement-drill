/* 英語テスト形式トレーニング 問題バンク（オリジナル作成）
   生データは data/*.js（window.RAW）。ここでアプリ用の形に整える。 */
(function () {
  var R = window.RAW || {};
  function wc(s) { return s.replace(/____/g, 'X').trim().split(/\s+/).length; }
  function lvB(w) { return w <= 7 ? 1 : w <= 9 ? 2 : w <= 11 ? 3 : w <= 13 ? 4 : 5; }
  function id(p, i) { return p + '-' + String(i + 1).padStart(4, '0'); }

  /* ---------- B: Repeat（5〜15語） ---------- */
  var B = (R.B || []).map(function (b, i) {
    var w = wc(b[0]);
    return { id: id('B', i), part: 'B', level: lvB(w), text: b[0], ja: b[1], words: w };
  }).filter(function (x) { return x.words >= 5 && x.words <= 15; });

  /* ---------- C: Sentence Builds ---------- */
  // [聞かせる順の3句, 正しい順の3句, 文末記号, 訳]
  var C = (R.C || []).map(function (c, i) {
    var a = c[1].join(' ') + c[2];
    a = a.charAt(0).toUpperCase() + a.slice(1);
    return { id: id('C', i), part: 'C', chunks: c[0], answer: a, ja: c[3], words: wc(a) };
  });

  /* ---------- D: Conversations ---------- */
  // [最初の話者, [t1,t2,t3], 質問, accepted, [訳1,訳2,訳3], 質問訳, 答え訳]
  var D = (R.D || []).map(function (d, i) {
    var other = d[0] === 'W' ? 'M' : 'W';
    var spk = [d[0], other, d[0]];
    var turns = d[1].map(function (t, k) { return { spk: spk[k], text: t, ja: (d[4] || [])[k] || '' }; });
    return { id: id('D', i), part: 'D', turns: turns, question: d[2], accepted: d[3], qja: d[5], aja: d[6], words: wc(d[1].join(' ')) };
  });

  /* ---------- F: Sentence Completion ---------- */
  // [文(____が空欄), accepted, 品詞, 完成文の訳]
  var F = (R.F || []).map(function (f, i) {
    return { id: id('F', i), part: 'F', sentence: f[0], accepted: f[1], pos: f[2], ja: f[3], words: wc(f[0]) };
  });

  /* ---------- G: Dictation（5〜6語） ---------- */
  var G = (R.G || []).map(function (g, i) {
    return { id: id('G', i), part: 'G', text: g[0], ja: g[1], words: wc(g[0]) };
  });

  /* ---------- H: Passage Reconstruction ---------- */
  // {passage, ja, points:[{en, ja, kw:[[alt,...],...], must}]}
  var H = (R.H || []).map(function (h, i) {
    return { id: id('H', i), part: 'H', passage: h.passage, ja: h.ja, points: h.points, words: wc(h.passage) };
  });

  window.ITEMS = { B: B, C: C, D: D, F: F, G: G, H: H };
})();
