// Part H: Passage Reconstruction (original items)
// kw: each inner array is a group; a point scores if every group has at least one alternative in the answer.
// must: "person" | "number" | "reason" | null  (must-points are weighted double)
window.RAW = window.RAW || {};
window.RAW.H = [
  {
    passage: "Robert went to a restaurant near his office on Friday. After dinner, the waiter brought the bill, but Robert couldn't find his wallet. He remembered that he had it when he came in. The waiter looked around the floor and found the wallet under the table. Robert was so thankful that he left a big tip of twenty dollars.",
    ja: "ロバートは金曜日、会社の近くのレストランに行った。夕食の後、ウェイターが伝票を持ってきたが、ロバートは財布が見つからなかった。店に入ったときには持っていたことを彼は覚えていた。ウェイターが床を見回すと、テーブルの下で財布を見つけた。ロバートはとても感謝して、20ドルという多めのチップを置いていった。",
    points: [
      { en: "Robert went to a restaurant near his office on Friday", ja: "ロバートは金曜日に会社近くのレストランへ行った", kw: [["robert"], ["restaurant", "diner", "cafe", "dinner", "eat", "ate"]], must: "person" },
      { en: "he couldn't find his wallet when the bill came", ja: "伝票が来たとき財布が見つからなかった", kw: [["wallet", "purse", "money"], ["find", "found", "lost", "lose", "missing", "gone", "look for", "looked for", "search", "searched"]], must: null },
      { en: "he remembered he had it when he came in", ja: "店に入ったときは持っていたと覚えていた", kw: [["remember", "remembered", "recall", "recalled", "knew", "sure", "came in", "come in", "arrived"]], must: null },
      { en: "the waiter found it under the table", ja: "ウェイターがテーブルの下で見つけた", kw: [["waiter", "server", "staff", "waitress"], ["table", "floor", "under"]], must: "person" },
      { en: "he left a big tip because he was thankful", ja: "感謝して多めのチップを置いた", kw: [["tip", "tipped"], ["thank", "thanked", "thankful", "thanks", "grateful", "happy", "glad"]], must: "reason" },
      { en: "the tip was 20 dollars", ja: "チップは20ドルだった", kw: [["20"]], must: "number" }
    ]
  },
  {
    passage: "Maria has a small bakery in Boston. Every morning, she wakes up at four o'clock to make bread. Last Monday, her oven stopped working, so she called her brother Paul. He fixed it in one hour. Maria was so thankful that she gave him ten fresh rolls to take home.",
    ja: "マリアはボストンで小さなパン屋を営んでいる。毎朝、パンを作るために4時に起きる。先週の月曜日、オーブンが動かなくなったので、彼女は兄（弟）のポールに電話した。彼は1時間で修理してくれた。マリアはとても感謝して、焼きたてのロールパンを10個、持ち帰り用に渡した。",
    points: [
      { en: "Maria has a bakery in Boston", ja: "マリアはボストンでパン屋をしている", kw: [["maria"], ["bakery", "bread shop", "bakeshop", "bake", "baker", "bread"]], must: "person" },
      { en: "she gets up at 4 to make bread", ja: "パンを作るため4時に起きる", kw: [["4"]], must: "number" },
      { en: "her oven broke last Monday", ja: "先週の月曜にオーブンが壊れた", kw: [["oven"], ["stop", "stopped", "broke", "broken", "break", "work", "worked", "problem", "trouble"]], must: null },
      { en: "she called her brother Paul", ja: "兄（弟）のポールに電話した", kw: [["paul", "brother"]], must: "person" },
      { en: "he fixed it in one hour", ja: "彼が1時間で直した", kw: [["fix", "fixed", "repair", "repaired"], ["1 hour", "an hour", "hour"]], must: "number" },
      { en: "she gave him ten rolls because she was thankful", ja: "感謝してロールパンを10個あげた", kw: [["10", "roll", "rolls", "bread"], ["thank", "thanked", "thankful", "thanks", "grateful", "happy", "glad", "gave", "give", "given"]], must: "reason" }
    ]
  },
  {
    passage: "Tom lives in Denver and works at a bank. On Wednesday, he missed his usual train because his alarm didn't ring. He took a taxi, but there was a lot of traffic. He arrived thirty minutes late. His boss wasn't angry, and Tom bought a new alarm clock that evening.",
    ja: "トムはデンバーに住んでいて、銀行で働いている。水曜日、目覚ましが鳴らなかったため、いつもの電車に乗り遅れた。タクシーに乗ったが、道がひどく混んでいた。彼は30分遅れて到着した。上司は怒らず、トムはその晩、新しい目覚まし時計を買った。",
    points: [
      { en: "Tom lives in Denver and works at a bank", ja: "トムはデンバーに住み銀行で働いている", kw: [["tom"], ["bank", "denver"]], must: "person" },
      { en: "he missed his train on Wednesday", ja: "水曜日にいつもの電車に乗り遅れた", kw: [["train"], ["miss", "missed", "late", "catch", "caught"]], must: null },
      { en: "because his alarm didn't ring", ja: "目覚ましが鳴らなかったから", kw: [["alarm", "clock"], ["ring", "rang", "go off", "went off", "didnt work", "not work", "wasnt working", "stopped working", "broke", "broken", "fail", "failed", "sound", "overslept", "oversleep"]], must: "reason" },
      { en: "he took a taxi but traffic was heavy", ja: "タクシーに乗ったが渋滞していた", kw: [["taxi", "cab", "traffic", "jam"]], must: null },
      { en: "he arrived 30 minutes late", ja: "30分遅れて着いた", kw: [["30"]], must: "number" },
      { en: "his boss wasn't angry", ja: "上司は怒らなかった", kw: [["boss", "manager", "supervisor"]], must: null },
      { en: "he bought a new alarm clock that evening", ja: "その晩、新しい目覚まし時計を買った", kw: [["new", "bought", "buy", "purchased", "got"], ["alarm", "clock"]], must: null }
    ]
  },
  {
    passage: "Emma's dog, Max, ran out of the house on Saturday because the gate was open. She looked for him in the park for two hours. A kind neighbor called her at six o'clock. He had found Max near the library. Emma was so happy that she closed the gate carefully from then on.",
    ja: "土曜日、エマの犬マックスは門が開いていたため家から飛び出してしまった。彼女は公園で2時間マックスを探した。6時に親切な近所の人から電話があった。図書館の近くでマックスを見つけてくれたのだ。エマはとても喜び、それからは門をしっかり閉めるようになった。",
    points: [
      { en: "Emma's dog Max ran away on Saturday", ja: "土曜日にエマの犬マックスが逃げ出した", kw: [["emma", "max"], ["dog", "puppy", "pet"]], must: "person" },
      { en: "because the gate was open", ja: "門が開いていたから", kw: [["gate", "door", "fence"], ["open", "opened"]], must: "reason" },
      { en: "she searched the park for 2 hours", ja: "公園で2時間探した", kw: [["2"], ["hour", "hours"]], must: "number" },
      { en: "a neighbor called her at 6", ja: "6時に近所の人から電話があった", kw: [["6"], ["neighbor", "neighbour", "call", "called", "phone", "phoned", "man", "someone"]], must: "number" },
      { en: "he found Max near the library", ja: "図書館の近くでマックスを見つけた", kw: [["library"]], must: null },
      { en: "she always closes the gate carefully now", ja: "それ以来、門をしっかり閉めている", kw: [["close", "closed", "closes", "closing", "shut", "lock", "locked", "careful", "carefully"]], must: null }
    ]
  },
  {
    passage: "Kenji wanted to surprise his mother on her sixtieth birthday. He asked his sister Yuki to take their mother out for lunch so that he could get ready at home. While they were away, Kenji cooked her favorite curry and put up balloons. When they came home, his mother cried and said it was the best birthday ever.",
    ja: "ケンジは母親の60歳の誕生日にサプライズをしたいと思った。家で準備ができるように、妹（姉）のユキに母をランチに連れ出してもらった。二人が出かけている間に、ケンジは母の好物のカレーを作り、風船を飾った。二人が帰宅すると、母は泣いて、今までで最高の誕生日だと言った。",
    points: [
      { en: "Kenji wanted to surprise his mother", ja: "ケンジは母にサプライズをしたかった", kw: [["kenji"], ["surprise", "surprised", "party", "celebrate", "special"]], must: "person" },
      { en: "it was her 60th birthday", ja: "母の60歳の誕生日だった", kw: [["60", "60th", "sixtieth"]], must: "number" },
      { en: "his sister Yuki took their mother out for lunch", ja: "妹（姉）のユキが母をランチに連れ出した", kw: [["yuki", "sister"]], must: "person" },
      { en: "so that Kenji could prepare at home", ja: "ケンジが家で準備できるように", kw: [["ready", "prepare", "prepared", "preparing", "plan", "planned", "decorate", "set up"]], must: "reason" },
      { en: "he cooked curry and put up balloons", ja: "カレーを作り風船を飾った", kw: [["curry", "balloon", "balloons", "decorate", "decorated", "decoration", "decorations"]], must: null },
      { en: "his mother cried and said it was the best birthday", ja: "母は泣いて最高の誕生日だと言った", kw: [["cry", "cried", "tear", "tears", "best", "happy", "moved", "loved"]], must: null }
    ]
  },
  {
    passage: "Lisa moved to Seattle in January and didn't know anyone, so she joined a book club at the local library. At first, she was too shy to talk. After three meetings, she made two friends, Anna and Carol. Now they meet for coffee every Sunday morning.",
    ja: "リサは1月にシアトルに引っ越したが、知り合いが誰もいなかったので、地元の図書館の読書会に参加した。最初は恥ずかしくて話せなかった。3回目の集まりのあと、アンナとキャロルという2人の友達ができた。今では毎週日曜日の朝に一緒にコーヒーを飲んでいる。",
    points: [
      { en: "Lisa moved to Seattle in January", ja: "リサは1月にシアトルへ引っ越した", kw: [["lisa"], ["seattle", "move", "moved", "new city", "new town", "january"]], must: "person" },
      { en: "she joined a book club because she knew nobody", ja: "知り合いがいなかったので読書会に入った", kw: [["club", "book group", "reading group", "group"], ["know", "knew", "lonely", "alone", "nobody", "friend", "friends", "new"]], must: "reason" },
      { en: "at first she was too shy to talk", ja: "最初は恥ずかしくて話せなかった", kw: [["shy", "quiet", "nervous", "talk", "speak"]], must: null },
      { en: "after 3 meetings", ja: "3回集まった後", kw: [["3"]], must: "number" },
      { en: "she made 2 friends, Anna and Carol", ja: "アンナとキャロルという2人の友達ができた", kw: [["anna", "carol", "2 friend", "2 friends"]], must: "person" },
      { en: "now they have coffee every Sunday morning", ja: "今は毎週日曜の朝にコーヒーを飲む", kw: [["coffee", "cafe"], ["sunday", "week", "weekly", "weekend"]], must: null }
    ]
  },
  {
    passage: "Daniel left his phone on the bus on his way to work on Tuesday. He noticed it at nine o'clock when he wanted to call a client. He used his coworker Sara's phone to call the bus company. A driver had found it. Daniel picked it up at the station after work and bought Sara a coffee to thank her.",
    ja: "火曜日、ダニエルは通勤途中のバスに携帯電話を置き忘れた。9時に顧客に電話しようとして、それに気づいた。彼は同僚のサラの電話を借りてバス会社に電話した。運転手が見つけてくれていた。ダニエルは仕事の後に駅で受け取り、お礼としてサラにコーヒーをおごった。",
    points: [
      { en: "Daniel left his phone on the bus on Tuesday", ja: "火曜日にダニエルはバスに携帯を忘れた", kw: [["daniel"], ["phone", "mobile", "cellphone", "smartphone", "cell"]], must: "person" },
      { en: "he noticed at 9 when he wanted to call a client", ja: "9時に顧客へ電話しようとして気づいた", kw: [["9"]], must: "number" },
      { en: "he used his coworker Sara's phone to call the bus company", ja: "同僚サラの電話でバス会社に電話した", kw: [["sara", "coworker", "co worker", "colleague"], ["borrow", "borrowed", "use", "used", "lent", "lend"]], must: "person" },
      { en: "a driver had found it", ja: "運転手が見つけていた", kw: [["driver", "found", "find", "kept", "keep"]], must: null },
      { en: "he picked it up at the station after work", ja: "仕事の後に駅で受け取った", kw: [["station", "office", "depot", "pick", "picked", "collect", "collected", "got it back", "get it back"]], must: null },
      { en: "he bought Sara coffee to thank her", ja: "お礼にサラにコーヒーをおごった", kw: [["coffee", "drink", "gift"], ["thank", "thanks", "thanked", "thankful", "grateful", "help", "helped"]], must: "reason" }
    ]
  },
  {
    passage: "Mr. Lee planned a team meeting for ten o'clock on Thursday. That morning, the meeting room was being cleaned, so he could not use it. He asked his assistant, Nina, to find another room. She booked a small room upstairs. The meeting started fifteen minutes late, but everyone came.",
    ja: "リー氏は木曜日の10時にチームミーティングを予定していた。その朝、会議室は清掃中だったため使えなかった。彼はアシスタントのニーナに別の部屋を探すよう頼んだ。彼女は上の階の小さな部屋を予約した。会議は15分遅れで始まったが、全員が出席した。",
    points: [
      { en: "Mr. Lee planned a team meeting", ja: "リー氏がチーム会議を予定した", kw: [["lee", "manager", "boss"], ["meeting", "meet"]], must: "person" },
      { en: "it was at 10 on Thursday", ja: "木曜日の10時だった", kw: [["10"]], must: "number" },
      { en: "the room was being cleaned, so he couldn't use it", ja: "部屋が清掃中で使えなかった", kw: [["clean", "cleaned", "cleaning", "cleaner", "cleaners"]], must: "reason" },
      { en: "he asked his assistant Nina to find another room", ja: "アシスタントのニーナに別の部屋を頼んだ", kw: [["nina", "assistant", "secretary"]], must: "person" },
      { en: "she booked a small room upstairs", ja: "上の階の小さな部屋を予約した", kw: [["room", "upstairs", "space"], ["book", "booked", "reserve", "reserved", "small", "upstairs", "upper floor"]], must: null },
      { en: "the meeting started 15 minutes late", ja: "会議は15分遅れで始まった", kw: [["15"]], must: "number" },
      { en: "but everyone came", ja: "でも全員来た", kw: [["everyone", "everybody", "whole team", "all came", "all the team", "all member", "all members"]], must: null }
    ]
  },
  {
    passage: "Grace ordered a chocolate cake for her son Ben's birthday party. When she picked it up on Saturday, it was a lemon cake. The shop had mixed up two orders. The baker said sorry and made a new chocolate cake in forty minutes. Because of the mistake, he also gave Grace the cake for free.",
    ja: "グレースは息子ベンの誕生日パーティーのためにチョコレートケーキを注文した。土曜日に受け取ると、それはレモンケーキだった。店が2件の注文を取り違えていたのだ。パン職人は謝り、40分で新しいチョコレートケーキを作った。間違いのお詫びとして、ケーキ代も無料にしてくれた。",
    points: [
      { en: "Grace ordered a chocolate cake for her son Ben's birthday", ja: "グレースは息子ベンの誕生日用にチョコケーキを注文した", kw: [["grace", "ben"], ["chocolate", "cake"]], must: "person" },
      { en: "when she picked it up, it was a lemon cake", ja: "受け取るとレモンケーキだった", kw: [["lemon", "wrong", "different"]], must: null },
      { en: "the shop had mixed up two orders", ja: "店が注文を取り違えていた", kw: [["mix", "mixed", "mix up", "wrong", "confuse", "confused", "error", "switch", "switched", "2 order", "2 orders", "another order"]], must: null },
      { en: "the baker apologized", ja: "パン職人が謝った", kw: [["sorry", "apologize", "apologized", "apologise", "apologised", "apology", "baker"]], must: null },
      { en: "he made a new cake in 40 minutes", ja: "40分で新しいケーキを作った", kw: [["40"]], must: "number" },
      { en: "he gave it for free because of the mistake", ja: "間違いのお詫びに無料にした", kw: [["free", "nothing", "no money", "no charge", "didnt pay", "not pay", "refund"], ["mistake", "mix", "mixed", "wrong", "error", "sorry"]], must: "reason" }
    ]
  },
  {
    passage: "Carlos rides his bike to school every day. On Monday, he got a flat tire halfway there, so he had to walk. His classmate Mia saw him and offered to help. She lent him her pump, and they fixed the tire in ten minutes. Carlos still got to class five minutes early.",
    ja: "カルロスは毎日自転車で通学している。月曜日、途中でタイヤがパンクしたので、歩かなければならなかった。クラスメートのミアが彼を見かけて、手伝うと申し出た。彼女が空気入れを貸してくれて、二人は10分でタイヤを直した。カルロスはそれでも授業の5分前に着いた。",
    points: [
      { en: "Carlos rides his bike to school", ja: "カルロスは自転車で通学している", kw: [["carlos"], ["bike", "bicycle", "cycle", "ride", "rides"]], must: "person" },
      { en: "he got a flat tire, so he had to walk", ja: "パンクしたので歩くことになった", kw: [["flat", "puncture", "punctured", "hole", "broke", "broken", "tire", "tyre"], ["walk", "walked", "push", "pushed", "stop", "stopped", "ride"]], must: "reason" },
      { en: "his classmate Mia offered to help", ja: "クラスメートのミアが手伝ってくれた", kw: [["mia", "classmate", "friend"]], must: "person" },
      { en: "she lent him her pump", ja: "空気入れを貸してくれた", kw: [["pump", "air"]], must: null },
      { en: "they fixed it in 10 minutes", ja: "10分で直した", kw: [["10"]], must: "number" },
      { en: "he got to class 5 minutes early", ja: "授業の5分前に着いた", kw: [["5"], ["early", "time", "before"]], must: "number" }
    ]
  },
  {
    passage: "Olivia had a business trip to Chicago on Tuesday. Her flight was canceled because of a big snowstorm. She called her manager, Mr. Brown, and he told her to join the meeting online. She worked from home and joined the call at two o'clock. The client was happy with the online meeting.",
    ja: "オリビアは火曜日にシカゴへの出張があった。大雪のため、飛行機が欠航になった。彼女が上司のブラウン氏に電話すると、オンラインで会議に参加するよう言われた。彼女は在宅で仕事をし、2時にオンライン会議に参加した。顧客はそのオンライン会議に満足した。",
    points: [
      { en: "Olivia had a business trip to Chicago", ja: "オリビアはシカゴに出張予定だった", kw: [["olivia"], ["chicago", "trip", "travel", "business"]], must: "person" },
      { en: "her flight was canceled because of a snowstorm", ja: "大雪で飛行機が欠航した", kw: [["snow", "snowstorm", "storm", "weather", "blizzard"]], must: "reason" },
      { en: "she called her manager Mr. Brown", ja: "上司のブラウン氏に電話した", kw: [["brown", "manager", "boss"]], must: "person" },
      { en: "he told her to join online", ja: "オンライン参加を指示された", kw: [["online", "video", "zoom", "internet", "remote", "remotely", "home"]], must: null },
      { en: "she joined the call at 2", ja: "2時に会議に参加した", kw: [["2"]], must: "number" },
      { en: "the client was happy", ja: "顧客は満足した", kw: [["client", "customer"], ["happy", "pleased", "satisfied", "glad", "fine", "good", "ok", "okay"]], must: null }
    ]
  },
  {
    passage: "Sam came home late on Friday night and found he had lost his keys. He could not get in, so he knocked on his neighbor's door. His neighbor, Mrs. Green, had a spare key because Sam gave her one last year. She was still awake at eleven o'clock. Sam got in and found his keys in his car the next morning.",
    ja: "金曜日の夜遅くに帰宅したサムは、鍵をなくしたことに気づいた。家に入れなかったので、隣の家のドアをノックした。隣人のグリーンさんは、去年サムが渡しておいた合鍵を持っていた。彼女は11時でもまだ起きていた。サムは家に入ることができ、翌朝、鍵は車の中で見つかった。",
    points: [
      { en: "Sam lost his keys on Friday night", ja: "サムは金曜の夜に鍵をなくした", kw: [["sam"], ["lost", "lose", "couldnt find", "forgot", "forget", "didnt have"]], must: "person" },
      { en: "he couldn't get in, so he went to his neighbor Mrs. Green", ja: "入れないので隣人のグリーンさんを訪ねた", kw: [["green", "neighbor", "neighbour", "next door"]], must: "person" },
      { en: "she had a spare key because Sam gave her one last year", ja: "去年サムが渡した合鍵を持っていた", kw: [["spare", "extra", "copy", "second", "another", "key"], ["gave", "give", "given", "last year", "before", "earlier"]], must: "reason" },
      { en: "she was still awake at 11", ja: "11時でもまだ起きていた", kw: [["11"]], must: "number" },
      { en: "he found his keys in his car the next morning", ja: "翌朝、鍵は車の中で見つかった", kw: [["car"]], must: null }
    ]
  },
  {
    passage: "Priya borrowed three books from the city library. She forgot to return them because she was busy with exams. When she went back two weeks late, the librarian, Mr. Hall, told her the fee was six dollars. Priya paid it and set a reminder on her phone so she would not forget again.",
    ja: "プリヤは市立図書館で本を3冊借りた。試験で忙しかったため、返すのを忘れてしまった。2週間遅れで返しに行くと、司書のホール氏に延滞料は6ドルだと言われた。プリヤはそれを払い、二度と忘れないように携帯にリマインダーを設定した。",
    points: [
      { en: "Priya borrowed 3 books from the library", ja: "プリヤは図書館で本を3冊借りた", kw: [["priya"], ["3", "book", "books", "library", "borrow", "borrowed"]], must: "person" },
      { en: "she forgot to return them because she was busy with exams", ja: "試験で忙しく返却を忘れた", kw: [["exam", "exams", "test", "tests", "busy", "study", "studying", "studied"]], must: "reason" },
      { en: "she went back 2 weeks late", ja: "2週間遅れで返しに行った", kw: [["2"], ["week", "weeks"]], must: "number" },
      { en: "the librarian Mr. Hall told her about the fee", ja: "司書のホール氏が延滞料を伝えた", kw: [["hall", "librarian"]], must: "person" },
      { en: "the fee was 6 dollars", ja: "延滞料は6ドルだった", kw: [["6"]], must: "number" },
      { en: "she set a reminder on her phone", ja: "携帯にリマインダーを設定した", kw: [["reminder", "remind", "alarm", "note", "calendar", "phone"]], must: null }
    ]
  },
  {
    passage: "Ahmed works at a coffee shop. On Sunday, his coworker Lily called in sick, so Ahmed worked her shift too. He worked for ten hours that day. The shop was very busy, but he did not make any mistakes. His manager was so pleased that she gave him an extra day off.",
    ja: "アハメドはコーヒーショップで働いている。日曜日、同僚のリリーが病欠の連絡をしてきたので、アハメドは彼女のシフトにも入った。その日、彼は10時間働いた。店はとても忙しかったが、彼は一度もミスをしなかった。店長はとても喜んで、彼に休みを1日追加でくれた。",
    points: [
      { en: "Ahmed works at a coffee shop", ja: "アハメドはコーヒーショップで働いている", kw: [["ahmed"], ["coffee", "cafe", "shop"]], must: "person" },
      { en: "his coworker Lily was sick, so he worked her shift", ja: "同僚リリーが病欠したので代わりに働いた", kw: [["sick", "ill", "unwell", "not feeling well", "cold", "fever"], ["lily", "coworker", "co worker", "colleague", "shift"]], must: "reason" },
      { en: "he worked 10 hours", ja: "10時間働いた", kw: [["10"]], must: "number" },
      { en: "the shop was very busy", ja: "店はとても忙しかった", kw: [["busy", "crowded", "customers", "lot of people"]], must: null },
      { en: "he made no mistakes", ja: "ミスをしなかった", kw: [["mistake", "mistakes", "error", "errors", "perfect", "perfectly", "well", "great"]], must: null },
      { en: "his manager gave him an extra day off", ja: "店長が休みを1日追加でくれた", kw: [["day off", "holiday", "free day", "rest", "vacation", "off"]], must: null }
    ]
  },
  {
    passage: "Mei was waiting for her train when she saw a little boy crying at five o'clock. He was crying because he had lost his mother in the crowd. Mei took him to the information desk, and a staff member made an announcement. His mother soon arrived and thanked Mei many times. Mei missed her train, but she was glad she helped.",
    ja: "メイが電車を待っていると、5時に小さな男の子が泣いているのを見かけた。人混みで母親とはぐれてしまって泣いていたのだ。メイは彼を案内所に連れて行き、係員がアナウンスをした。母親はすぐにやって来て、メイに何度もお礼を言った。メイは電車に乗り遅れたが、助けられてよかったと思った。",
    points: [
      { en: "Mei was waiting for her train", ja: "メイは電車を待っていた", kw: [["mei"], ["wait", "waiting", "waited", "station", "platform"]], must: "person" },
      { en: "at 5 she saw a little boy crying", ja: "5時に泣いている男の子を見かけた", kw: [["5"], ["boy", "child", "kid", "crying", "cry", "cried"]], must: "number" },
      { en: "he was crying because he lost his mother", ja: "母親とはぐれて泣いていた", kw: [["lost", "lose", "went missing", "couldnt find", "separated", "alone"], ["mother", "mom", "mum", "parent", "parents", "family"]], must: "reason" },
      { en: "she took him to the information desk for an announcement", ja: "案内所に連れて行きアナウンスしてもらった", kw: [["desk", "information", "staff", "announcement", "announce", "announced", "office"]], must: null },
      { en: "his mother came and thanked Mei", ja: "母親が来てメイにお礼を言った", kw: [["thank", "thanked", "thanks", "grateful", "came", "arrived", "found"]], must: null },
      { en: "Mei missed her train but was glad she helped", ja: "電車に乗り遅れたが助けてよかった", kw: [["miss", "missed", "late", "glad", "happy"]], must: null }
    ]
  },
  {
    passage: "Jack and his friend Leo planned to go hiking on Saturday. On Friday night, the weather report said it would rain all day, so they changed their plans. Instead, they went to a museum in the city. They stayed there for three hours and had lunch in the museum cafe. Jack said it was a good change.",
    ja: "ジャックと友人のレオは土曜日にハイキングに行く予定だった。金曜の夜、天気予報で一日中雨だと言っていたので、二人は予定を変えた。代わりに、街の博物館に行った。そこで3時間過ごし、博物館のカフェで昼食をとった。ジャックはいい変更だったと言った。",
    points: [
      { en: "Jack and Leo planned to go hiking on Saturday", ja: "ジャックとレオは土曜にハイキング予定だった", kw: [["jack", "leo"], ["hike", "hiking", "hiked", "mountain", "walk", "trip", "outside"]], must: "person" },
      { en: "it was going to rain, so they changed their plans", ja: "雨予報なので予定を変えた", kw: [["rain", "raining", "rainy", "weather", "storm"]], must: "reason" },
      { en: "they went to a museum instead", ja: "代わりに博物館へ行った", kw: [["museum", "gallery"]], must: null },
      { en: "they stayed for 3 hours", ja: "3時間過ごした", kw: [["3"]], must: "number" },
      { en: "they had lunch in the cafe", ja: "カフェで昼食をとった", kw: [["lunch", "eat", "ate", "cafe", "food", "meal"]], must: null },
      { en: "Jack said it was a good change", ja: "ジャックはいい変更だったと言った", kw: [["good", "nice", "great", "fun", "enjoy", "enjoyed", "happy", "better"]], must: null }
    ]
  },
  {
    passage: "Fatima had to print fifty copies of a report for a nine o'clock meeting. Just before the meeting, the printer stopped working because it had no paper. Her coworker Ken ran to the storeroom and brought more paper. Fatima finished printing just in time. After the meeting, she bought Ken lunch to thank him.",
    ja: "ファティマは9時の会議のために報告書を50部印刷しなければならなかった。会議の直前、紙がなくなってプリンターが止まってしまった。同僚のケンが倉庫に走って紙を持ってきてくれた。ファティマはぎりぎり間に合って印刷を終えた。会議の後、彼女はお礼にケンに昼食をおごった。",
    points: [
      { en: "Fatima had to print copies of a report", ja: "ファティマは報告書を印刷する必要があった", kw: [["fatima"], ["print", "printed", "printing", "copy", "copies", "report"]], must: "person" },
      { en: "she needed 50 copies", ja: "50部必要だった", kw: [["50"]], must: "number" },
      { en: "the meeting was at 9", ja: "会議は9時だった", kw: [["9"]], must: "number" },
      { en: "the printer stopped because there was no paper", ja: "紙がなくてプリンターが止まった", kw: [["printer", "machine"], ["no paper", "out of paper", "ran out", "run out", "empty", "stop", "stopped", "broke", "broken", "didnt work", "jam", "jammed"]], must: "reason" },
      { en: "her coworker Ken brought more paper", ja: "同僚のケンが紙を持ってきた", kw: [["ken", "coworker", "co worker", "colleague"], ["brought", "bring", "got", "get", "fetch", "fetched", "ran", "run", "found", "more paper", "help", "helped"]], must: "person" },
      { en: "she finished just in time", ja: "ぎりぎり間に合った", kw: [["time", "finish", "finished", "done", "made it", "ready"]], must: null },
      { en: "she bought Ken lunch to thank him", ja: "お礼にケンに昼食をおごった", kw: [["lunch", "meal", "food"]], must: null }
    ]
  },
  {
    passage: "Hannah went to the supermarket to buy food for a dinner party. At the checkout, she realized she had left her credit card at home. The total was forty dollars, but she only had ten dollars in cash. A man behind her, Mr. Ito, offered to pay. Hannah paid him back the next day because she wanted to be honest.",
    ja: "ハンナは夕食会の食材を買いにスーパーへ行った。レジで、クレジットカードを家に置いてきたことに気づいた。合計は40ドルだったが、現金は10ドルしか持っていなかった。後ろにいた男性のイトウさんが払ってあげると申し出た。ハンナは誠実でありたかったので、翌日彼にお金を返した。",
    points: [
      { en: "Hannah went shopping for a dinner party", ja: "ハンナは夕食会の買い物に行った", kw: [["hannah"], ["supermarket", "store", "shop", "shopping", "grocery", "market", "food"]], must: "person" },
      { en: "she had left her credit card at home", ja: "クレジットカードを家に忘れた", kw: [["card", "credit"], ["home", "forgot", "forget", "left", "leave", "didnt have", "didnt bring", "lost"]], must: null },
      { en: "the total was 40 dollars", ja: "合計は40ドルだった", kw: [["40"]], must: "number" },
      { en: "she only had 10 dollars in cash", ja: "現金は10ドルしかなかった", kw: [["10"]], must: "number" },
      { en: "a man named Mr. Ito offered to pay", ja: "イトウさんという男性が払うと申し出た", kw: [["ito", "man", "stranger", "person", "guy"], ["pay", "paid", "help", "helped"]], must: "person" },
      { en: "she paid him back because she wanted to be honest", ja: "誠実でありたいので翌日返した", kw: [["honest", "honesty", "fair", "right thing", "owe", "owed", "polite", "kind"]], must: "reason" }
    ]
  },
  {
    passage: "Kevin had to send an important report to his boss by five o'clock on Friday. At three o'clock, his computer suddenly shut down and would not turn on. Luckily, he had saved the file online, so he used his coworker Rosa's laptop. He sent the report at four thirty. His boss thanked him for finishing on time.",
    ja: "ケビンは金曜日の5時までに上司へ大事な報告書を送らなければならなかった。3時に、パソコンが突然落ちて、電源が入らなくなった。幸いファイルをオンラインに保存していたので、同僚のローザのノートパソコンを借りた。彼は4時半に報告書を送った。上司は時間内に終えたことにお礼を言った。",
    points: [
      { en: "Kevin had to send a report to his boss", ja: "ケビンは上司に報告書を送る必要があった", kw: [["kevin"], ["report", "file", "document", "work"]], must: "person" },
      { en: "the deadline was 5 on Friday", ja: "締め切りは金曜の5時だった", kw: [["5"]], must: "number" },
      { en: "at 3 his computer shut down", ja: "3時にパソコンが落ちた", kw: [["3"], ["computer", "pc", "shut", "broke", "broken", "crash", "crashed", "died", "dead"]], must: "number" },
      { en: "he had saved the file online, so he could use another computer", ja: "オンライン保存していたので別のPCで作業できた", kw: [["save", "saved", "online", "cloud", "backup", "backed up", "internet"]], must: "reason" },
      { en: "he used his coworker Rosa's laptop", ja: "同僚ローザのノートPCを借りた", kw: [["rosa", "coworker", "co worker", "colleague"]], must: "person" },
      { en: "he sent it at 4:30", ja: "4時半に送った", kw: [["4 30", "430", "half past 4"]], must: "number" },
      { en: "his boss thanked him", ja: "上司がお礼を言った", kw: [["thank", "thanked", "thanks", "happy", "pleased", "on time", "in time"]], must: null }
    ]
  },
  {
    passage: "Yuna had a dentist appointment at two o'clock on Wednesday. In the morning, the clinic called and said the dentist was sick. They moved her appointment to Friday at ten. Yuna was happy because she had an important meeting on Wednesday afternoon anyway. On Friday, the checkup took only twenty minutes.",
    ja: "ユナは水曜日の2時に歯医者の予約があった。朝、医院から電話があり、歯科医が体調不良だと言われた。予約は金曜日の10時に変更された。ユナはどのみち水曜の午後に大事な会議があったので、うれしかった。金曜日、検診はたった20分で終わった。",
    points: [
      { en: "Yuna had a dentist appointment", ja: "ユナは歯医者の予約があった", kw: [["yuna"], ["dentist", "dental", "clinic", "teeth", "tooth", "doctor"]], must: "person" },
      { en: "it was at 2 on Wednesday", ja: "水曜の2時だった", kw: [["2"]], must: "number" },
      { en: "the clinic called because the dentist was sick", ja: "歯科医が体調不良で医院から連絡があった", kw: [["sick", "ill", "unwell", "cold"]], must: "reason" },
      { en: "it was moved to Friday at 10", ja: "金曜の10時に変更された", kw: [["10"]], must: "number" },
      { en: "she was happy because she had a meeting on Wednesday", ja: "水曜に会議があったので好都合だった", kw: [["meeting", "busy", "work"]], must: "reason" },
      { en: "the checkup took only 20 minutes", ja: "検診は20分で終わった", kw: [["20"]], must: "number" }
    ]
  },
  {
    passage: "Noah wanted to learn to cook because he was tired of eating fast food. He joined a cooking class that met every Tuesday evening. The teacher, Chef Rossi, taught six students. After one month, Noah could make pasta and soup. Now he cooks dinner for his roommate four times a week.",
    ja: "ノアはファストフードばかりの食事に飽きたので、料理を習いたいと思った。彼は毎週火曜の夜に開かれる料理教室に参加した。講師のロッシシェフは6人の生徒を教えていた。1か月後、ノアはパスタとスープを作れるようになった。今では週に4回、ルームメイトのために夕食を作っている。",
    points: [
      { en: "Noah joined a cooking class on Tuesday evenings", ja: "ノアは火曜夜の料理教室に入った", kw: [["noah"], ["cook", "cooking", "class", "lesson", "lessons", "school"]], must: "person" },
      { en: "because he was tired of fast food", ja: "ファストフードに飽きたから", kw: [["fast food", "junk food", "eating out", "burger", "burgers", "takeout", "tired"]], must: "reason" },
      { en: "the teacher Chef Rossi taught the class", ja: "講師はロッシシェフだった", kw: [["rossi", "chef", "teacher"]], must: "person" },
      { en: "there were 6 students", ja: "生徒は6人だった", kw: [["6"]], must: "number" },
      { en: "after 1 month he could make pasta and soup", ja: "1か月でパスタとスープが作れるようになった", kw: [["1 month", "a month", "month"], ["pasta", "soup"]], must: "number" },
      { en: "he cooks for his roommate 4 times a week", ja: "週4回ルームメイトに料理する", kw: [["4"]], must: "number" }
    ]
  },
  {
    passage: "Rachel saw her old neighbor, Mr. Kim, carrying heavy shopping bags up the stairs. He was eighty years old, so Rachel offered to help. She carried the bags to his apartment. Mr. Kim invited her in for tea and told her stories about his life. They talked for an hour. Since then, Rachel has visited him every week.",
    ja: "レイチェルは、年配の隣人キムさんが重い買い物袋を持って階段を上っているのを見かけた。彼は80歳だったので、レイチェルは手伝いを申し出た。彼女は袋を彼の部屋まで運んだ。キムさんは彼女をお茶に招き、自分の人生の話をした。二人は1時間話した。それ以来、レイチェルは毎週彼を訪ねている。",
    points: [
      { en: "Rachel saw her neighbor Mr. Kim", ja: "レイチェルは隣人のキムさんを見かけた", kw: [["rachel"], ["kim", "neighbor", "neighbour", "man"]], must: "person" },
      { en: "he was carrying heavy bags up the stairs", ja: "重い袋を持って階段を上っていた", kw: [["bag", "bags", "shopping", "heavy", "stairs"]], must: null },
      { en: "he was 80 years old", ja: "彼は80歳だった", kw: [["80"]], must: "number" },
      { en: "because he was old, she offered to help carry them", ja: "高齢なので運ぶのを手伝った", kw: [["old", "elderly", "80", "age", "heavy"], ["help", "helped", "offer", "offered"]], must: "reason" },
      { en: "he invited her for tea and told stories", ja: "お茶に招いて昔話をした", kw: [["tea", "story", "stories", "talk", "talked", "chat", "chatted"]], must: null },
      { en: "now she visits him every week", ja: "今は毎週訪ねている", kw: [["week", "weekly"]], must: null }
    ]
  },
  {
    passage: "Diego coaches a children's soccer team. Their game was planned for Saturday at nine, but the field was too wet because of heavy rain. Diego called the other coach, Ms. White, and they moved the game to Sunday. Twelve children came, and Diego's team won by two goals. The parents brought snacks to celebrate.",
    ja: "ディエゴは子どものサッカーチームのコーチをしている。試合は土曜の9時の予定だったが、大雨でグラウンドがぬかるんでいた。ディエゴは相手チームのコーチ、ホワイトさんに電話し、試合を日曜に移した。12人の子どもが来て、ディエゴのチームは2点差で勝った。保護者たちはお祝いにお菓子を持ってきた。",
    points: [
      { en: "Diego coaches a children's soccer team", ja: "ディエゴは子どものサッカーチームのコーチ", kw: [["diego"], ["soccer", "football", "team", "coach", "coaches"]], must: "person" },
      { en: "the game was planned for Saturday at 9", ja: "試合は土曜9時の予定だった", kw: [["9"]], must: "number" },
      { en: "the field was too wet because of rain", ja: "雨でグラウンドがぬかるんでいた", kw: [["rain", "rained", "rainy", "wet", "muddy", "water"]], must: "reason" },
      { en: "he called the other coach Ms. White and moved it to Sunday", ja: "相手コーチのホワイトさんと日曜に変更した", kw: [["white", "other coach", "another coach", "sunday"]], must: "person" },
      { en: "12 children came", ja: "12人の子どもが来た", kw: [["12"]], must: "number" },
      { en: "his team won by 2 goals", ja: "2点差で勝った", kw: [["2"], ["goal", "goals", "won", "win", "beat", "point", "points"]], must: "number" },
      { en: "the parents brought snacks", ja: "保護者がお菓子を持ってきた", kw: [["snack", "snacks", "food", "treat", "treats", "party", "celebrate", "celebrated"]], must: null }
    ]
  },
  {
    passage: "Sophie had a job interview at eleven o'clock. She went to the wrong building because the address in the email was old. A security guard named Omar showed her the right building, which was ten minutes away. Sophie ran there and arrived just in time. Two days later, the company called to offer her the job.",
    ja: "ソフィーは11時に就職面接があった。メールに書かれた住所が古かったため、彼女は間違った建物に行ってしまった。オマールという警備員が正しい建物を教えてくれたが、そこは10分離れた場所だった。ソフィーは走って、ぎりぎり間に合った。2日後、会社から採用の電話があった。",
    points: [
      { en: "Sophie had a job interview", ja: "ソフィーは就職面接があった", kw: [["sophie"], ["interview", "job"]], must: "person" },
      { en: "it was at 11", ja: "11時だった", kw: [["11"]], must: "number" },
      { en: "she went to the wrong building because the address was old", ja: "住所が古く間違った建物に行った", kw: [["address", "email", "mail", "map"], ["wrong", "old", "mistake", "incorrect", "different"]], must: "reason" },
      { en: "a guard named Omar showed her the right building", ja: "警備員のオマールが正しい建物を教えた", kw: [["omar", "guard", "security"]], must: "person" },
      { en: "it was 10 minutes away", ja: "10分離れていた", kw: [["10"]], must: "number" },
      { en: "she ran and arrived just in time", ja: "走ってぎりぎり間に合った", kw: [["time", "made it", "arrived", "ran", "run", "hurry", "hurried"]], must: null },
      { en: "2 days later she got the job", ja: "2日後に採用された", kw: [["2"], ["offer", "offered", "hired", "got", "get", "pass", "passed", "job"]], must: "number" }
    ]
  },
  {
    passage: "Chloe ordered a blue jacket online for forty dollars. When it arrived on Thursday, it was too small, so she wanted to return it. She called the store, and a worker named Jason told her to send it back for free. Chloe got a larger size five days later. It fit perfectly, and she wore it to her friend's wedding.",
    ja: "クロエはネットで青いジャケットを40ドルで注文した。木曜日に届くと小さすぎたので、返品したいと思った。店に電話すると、ジェイソンという店員が無料で送り返せると教えてくれた。5日後、クロエは大きいサイズを受け取った。サイズはぴったりで、彼女はそれを友人の結婚式に着ていった。",
    points: [
      { en: "Chloe ordered a blue jacket online", ja: "クロエはネットで青いジャケットを注文した", kw: [["chloe"], ["jacket", "coat"]], must: "person" },
      { en: "it cost 40 dollars", ja: "40ドルだった", kw: [["40"]], must: "number" },
      { en: "it was too small, so she wanted to return it", ja: "小さすぎたので返品したかった", kw: [["small", "tight", "didnt fit", "not fit"], ["return", "returned", "send back", "sent back", "send it back", "sent it back", "exchange", "exchanged", "change"]], must: "reason" },
      { en: "a worker named Jason said she could send it back for free", ja: "店員のジェイソンが無料で返品できると言った", kw: [["jason", "worker", "staff", "store", "shop"], ["free", "no cost", "no charge", "nothing", "send", "sent", "return"]], must: "person" },
      { en: "she got a bigger size 5 days later", ja: "5日後に大きいサイズが届いた", kw: [["5"]], must: "number" },
      { en: "she wore it to a wedding", ja: "結婚式に着ていった", kw: [["wedding", "wore", "wear", "fit", "perfect", "perfectly"]], must: null }
    ]
  },
  {
    passage: "Ryan wanted to run a marathon because his father had run one when he was young. He started training in March. Every morning, he ran for one hour before work. His wife, Kate, cooked healthy meals for him. In October, Ryan finished the race in four hours and twenty minutes, and his father was waiting at the finish line.",
    ja: "ライアンは、父親が若い頃にマラソンを走ったので、自分も走りたいと思った。3月に練習を始めた。毎朝、仕事の前に1時間走った。妻のケイトは彼のために健康的な食事を作った。10月、ライアンは4時間20分でレースを完走し、ゴールでは父親が待っていた。",
    points: [
      { en: "Ryan wanted to run a marathon", ja: "ライアンはマラソンを走りたかった", kw: [["ryan"], ["marathon", "race", "run", "running"]], must: "person" },
      { en: "because his father had run one", ja: "父親も走ったことがあったから", kw: [["father", "dad"], ["young", "youth", "when he was", "past", "ago", "inspired", "like his", "had run", "father ran", "dad ran", "father did", "dad did"]], must: "reason" },
      { en: "he ran 1 hour every morning before work", ja: "毎朝仕事前に1時間走った", kw: [["1 hour", "an hour", "60 minutes"]], must: "number" },
      { en: "his wife Kate cooked healthy meals", ja: "妻のケイトが健康的な食事を作った", kw: [["kate", "wife"], ["meal", "meals", "food", "cook", "cooked", "healthy", "dinner"]], must: "person" },
      { en: "he finished in 4 hours and 20 minutes", ja: "4時間20分で完走した", kw: [["4"], ["20"]], must: "number" },
      { en: "his father was waiting at the finish line", ja: "ゴールで父親が待っていた", kw: [["father", "dad"], ["wait", "waiting", "waited", "finish line", "goal", "end", "watch", "watched", "cheer", "cheered"]], must: null }
    ]
  },
  {
    passage: "Zoe went to visit her parents in London for one week. Before she left, she asked her neighbor Ivan to water her plants because it was very hot that summer. When she came back, all twelve plants were healthy. To say thank you, Zoe gave Ivan a box of chocolates from London.",
    ja: "ゾーイは1週間、ロンドンの両親を訪ねた。出発前、その夏はとても暑かったので、隣人のイワンに植物の水やりを頼んだ。帰ってくると、12鉢の植物はすべて元気だった。お礼に、ゾーイはイワンにロンドンのチョコレートを1箱あげた。",
    points: [
      { en: "Zoe visited her parents in London", ja: "ゾーイはロンドンの両親を訪ねた", kw: [["zoe"], ["london", "parents", "family", "mother", "father"]], must: "person" },
      { en: "she was away for 1 week", ja: "1週間留守にした", kw: [["1 week", "a week", "week", "7 days"]], must: "number" },
      { en: "she asked her neighbor Ivan to water her plants", ja: "隣人のイワンに水やりを頼んだ", kw: [["ivan", "neighbor", "neighbour"], ["water", "watered", "watering", "take care", "look after", "looked after", "care"]], must: "person" },
      { en: "because it was very hot", ja: "とても暑かったから", kw: [["hot", "heat", "summer", "dry", "sunny", "warm"]], must: "reason" },
      { en: "all 12 plants were healthy", ja: "12鉢すべて元気だった", kw: [["12"]], must: "number" },
      { en: "she gave Ivan chocolates to thank him", ja: "お礼にイワンにチョコをあげた", kw: [["chocolate", "chocolates", "candy", "sweets", "gift", "present"]], must: null }
    ]
  },
  {
    passage: "Amir started a new job at a hotel on Monday. He was nervous because he had never worked at a front desk before. His trainer, Julia, showed him how to check guests in. By Friday, he had helped more than fifty guests. Julia told the manager that Amir learned very quickly.",
    ja: "アミールは月曜日からホテルで新しい仕事を始めた。フロントで働くのは初めてだったので緊張していた。トレーナーのジュリアが、チェックインの手続きの仕方を教えてくれた。金曜日までに、彼は50人以上の客の対応をした。ジュリアは支配人に、アミールはとても覚えが早いと伝えた。",
    points: [
      { en: "Amir started a new job at a hotel", ja: "アミールはホテルで働き始めた", kw: [["amir"], ["hotel"]], must: "person" },
      { en: "he was nervous because he had never worked at a front desk", ja: "フロント経験がなく緊張していた", kw: [["nervous", "worried", "scared", "afraid", "anxious", "never", "first time", "experience"]], must: "reason" },
      { en: "his trainer Julia taught him", ja: "トレーナーのジュリアが教えた", kw: [["julia", "trainer", "teacher", "coworker", "colleague"]], must: "person" },
      { en: "she showed him how to check guests in", ja: "チェックインの仕方を教えた", kw: [["check", "checkin", "register", "registration", "key", "keys", "room", "rooms"]], must: null },
      { en: "by Friday he had helped more than 50 guests", ja: "金曜までに50人以上を対応した", kw: [["50"]], must: "number" },
      { en: "he learned very quickly", ja: "覚えがとても早かった", kw: [["quick", "quickly", "fast", "learn", "learned", "learnt", "good", "well"]], must: null }
    ]
  },
  {
    passage: "Owen wanted to take his girlfriend, Rina, to a concert for her birthday. When he tried to buy tickets online, they were already sold out. He felt sad, but his coworker said her brother had two extra tickets. Owen bought them for eighty dollars. Rina was so surprised that she couldn't stop smiling.",
    ja: "オーウェンは恋人のリナの誕生日に、彼女をコンサートに連れて行きたいと思った。ネットでチケットを買おうとすると、すでに売り切れていた。がっかりしていると、同僚が、自分の兄（弟）が余ったチケットを2枚持っていると教えてくれた。オーウェンはそれを80ドルで買った。リナはとても驚いて、笑顔が止まらなかった。",
    points: [
      { en: "Owen wanted to take his girlfriend Rina to a concert", ja: "オーウェンは恋人リナをコンサートに誘いたかった", kw: [["owen", "rina"], ["concert", "show", "live", "music"]], must: "person" },
      { en: "because it was her birthday", ja: "彼女の誕生日だったから", kw: [["birthday"]], must: "reason" },
      { en: "the tickets were sold out", ja: "チケットは売り切れだった", kw: [["sold out", "sell out", "no ticket", "no tickets", "no more", "gone", "none", "couldnt buy", "couldnt get"]], must: null },
      { en: "his coworker's brother had extra tickets", ja: "同僚の兄（弟）が余りのチケットを持っていた", kw: [["brother", "coworker", "co worker", "colleague", "friend"]], must: null },
      { en: "there were 2 tickets", ja: "チケットは2枚だった", kw: [["2"]], must: "number" },
      { en: "he paid 80 dollars", ja: "80ドル払った", kw: [["80"]], must: "number" },
      { en: "Rina was very surprised and happy", ja: "リナはとても驚いて喜んだ", kw: [["surprise", "surprised", "happy", "smile", "smiled", "smiling", "glad", "excited", "pleased"]], must: null }
    ]
  },
  {
    passage: "Ms. Lopez, a teacher, took twenty students to the zoo on Thursday. The bus was supposed to come at eight, but it was late because of an accident on the highway. The bus company said it would take forty minutes. While they waited, she played a word game with the students. They reached the zoo at ten and still had a great day.",
    ja: "教師のロペス先生は、木曜日に生徒20人を動物園に連れて行った。バスは8時に来る予定だったが、高速道路の事故のせいで遅れた。バス会社によると、40分かかるとのことだった。待っている間、彼女は生徒たちと言葉遊びをした。一行は10時に動物園に着き、それでも素晴らしい一日を過ごした。",
    points: [
      { en: "Ms. Lopez, a teacher, took students to the zoo", ja: "ロペス先生が生徒を動物園に連れて行った", kw: [["lopez", "teacher"], ["zoo", "trip", "student", "students"]], must: "person" },
      { en: "there were 20 students", ja: "生徒は20人だった", kw: [["20"]], must: "number" },
      { en: "the bus should have come at 8", ja: "バスは8時に来る予定だった", kw: [["8"]], must: "number" },
      { en: "the bus was late because of an accident", ja: "事故でバスが遅れた", kw: [["accident", "crash", "traffic"]], must: "reason" },
      { en: "it would take 40 minutes", ja: "40分かかるとのことだった", kw: [["40"]], must: "number" },
      { en: "she played a word game while they waited", ja: "待つ間に言葉遊びをした", kw: [["game", "games", "play", "played"]], must: null },
      { en: "they reached the zoo at 10 and had a great day", ja: "10時に着き楽しい一日を過ごした", kw: [["10"]], must: "number" }
    ]
  }
];
