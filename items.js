/* 英語テスト形式トレーニング 問題バンク（テスト版・オリジナル作成）
   Pearson公式サンプルの複製ではない。設計書 §3.1 のJSON形式に準拠（audioは省略）。 */
(function () {
  function wc(s) { return s.replace(/____/g, 'X').trim().split(/\s+/).length; }
  function lvB(w) { return w <= 5 ? 1 : w <= 8 ? 2 : w <= 11 ? 3 : w <= 13 ? 4 : 5; }
  function lvG(w) { return w <= 4 ? 1 : w <= 6 ? 2 : w <= 9 ? 3 : w <= 12 ? 4 : 5; }

  /* ---------- B: Repeat ---------- */
  var Bs = [
    "I'm so tired.", "Where's my phone?", "We're almost there.", "Can you help me?",
    "I'll call you later.", "Please close the door.", "She's waiting outside the office.",
    "I don't like coffee very much.", "Did you finish the report yet?",
    "We have a meeting at three today.", "He's going to visit his parents.",
    "The store closes early on Sundays.", "I forgot to bring my umbrella this morning.",
    "Could you tell me where the station is?", "My sister called me when she got home.",
    "It's not too late to change your mind.", "They moved to a smaller house last year.",
    "I think we should leave before it gets dark.", "She asked me to send the schedule to everyone.",
    "If it rains tomorrow, we'll have lunch inside.",
    "The doctor said I should get more sleep every night.",
    "I've been waiting for the bus for almost twenty minutes.",
    "Do you know if there's a pharmacy near the hotel?",
    "My brother is learning to cook because he lives alone now.",
    "We decided to take the early train so we wouldn't miss the meeting this morning.",
    "I'd like to return this jacket because it doesn't fit me.",
    "He told me that his flight was delayed by about two hours.",
    "Please let me know if you can't come to the party on Saturday.",
    "My manager wants everyone to finish their reports before the end of the week.",
    "I was going to call you, but I couldn't find your new number.",
    "The children were so excited that they couldn't fall asleep last night.",
    "We've been looking for an apartment close to the office since last spring."
  ];
  var B = Bs.map(function (t, i) {
    var w = wc(t);
    return { id: 'B-' + String(i + 1).padStart(4, '0'), part: 'B', level: lvB(w), text: t, words: w, voice: 'auto', tags: [] };
  }).sort(function (a, b) { return a.words - b.words; });

  /* ---------- C: Sentence Builds ---------- */
  // [聞かせる順に表示する3句(順不同), 正しい順の3句, 文末記号]
  var Cs = [
    [["moved to the new office", "last week", "my boss"], ["my boss", "moved to the new office", "last week"], "."],
    [["are playing", "the children", "in the garden"], ["the children", "are playing", "in the garden"], "."],
    [["a new laptop yesterday", "my sister", "bought"], ["my sister", "bought", "a new laptop yesterday"], "."],
    [["at the station at noon", "will meet", "we"], ["we", "will meet", "at the station at noon"], "."],
    [["gave us", "a lot of work", "the manager"], ["the manager", "gave us", "a lot of work"], "."],
    [["to Canada", "I", "have never been"], ["I", "have never been", "to Canada"], "."],
    [["by two hours", "our flight", "was delayed"], ["our flight", "was delayed", "by two hours"], "."],
    [["the bus to work", "he", "always takes"], ["he", "always takes", "the bus to work"], "."],
    [["us this weekend", "are visiting", "my parents"], ["my parents", "are visiting", "us this weekend"], "."],
    [["opens", "at nine every morning", "the store"], ["the store", "opens", "at nine every morning"], "."],
    [["to go to the party", "she", "doesn't want"], ["she", "doesn't want", "to go to the party"], "."],
    [["told me", "to rest for a few days", "the doctor"], ["the doctor", "told me", "to rest for a few days"], "."],
    [["a small hotel near the beach", "they", "stayed at"], ["they", "stayed at", "a small hotel near the beach"], "."],
    [["that red jacket", "where", "did you buy"], ["where", "did you buy", "that red jacket"], "?"],
    [["leave tomorrow", "what time", "does the train"], ["what time", "does the train", "leave tomorrow"], "?"],
    [["the schedule for next week", "can you", "send me"], ["can you", "send me", "the schedule for next week"], "?"],
    [["lived in this city", "how long", "have you"], ["how long", "have you", "lived in this city"], "?"],
    [["our broken window", "my neighbor", "fixed"], ["my neighbor", "fixed", "our broken window"], "."],
    [["to open our books", "the teacher", "asked us"], ["the teacher", "asked us", "to open our books"], "."],
    [["my keys in the car", "I", "left"], ["I", "left", "my keys in the car"], "."]
  ];
  var C = Cs.map(function (c, i) {
    var a = c[1].join(' ') + c[2];
    a = a.charAt(0).toUpperCase() + a.slice(1);
    return { id: 'C-' + String(i + 1).padStart(4, '0'), part: 'C', chunks: c[0], answer: a, words: wc(a), tags: [] };
  });

  /* ---------- D: Conversations ---------- */
  // [最初の話者, [t1,t2,t3], 質問, accepted]
  var Ds = [
    ["W", ["Are you ready for the trip tomorrow?", "Almost. I still need to pack my bag.", "Don't forget your passport!"], "What does the man still need to do?", ["pack his bag", "pack", "packing", "he needs to pack", "pack his suitcase"]],
    ["M", ["Excuse me, is this seat taken?", "No, please sit down.", "Thanks. It's a very crowded train today."], "What is the man asking about?", ["a seat", "the seat", "if the seat is taken", "a free seat", "sitting down"]],
    ["W", ["I'm hungry. Let's get lunch.", "Sure. There's a good pizza place on Main Street.", "Great, I love pizza."], "Where will they probably eat?", ["pizza place", "a pizza place", "at a pizza place", "on main street", "pizza restaurant"]],
    ["M", ["You look tired, Anna.", "I only slept four hours last night.", "You should go home and rest."], "Why does the woman look tired?", ["she only slept four hours", "she didn't sleep", "little sleep", "not enough sleep", "she slept four hours"]],
    ["W", ["Did you see the new manager yet?", "Yes, he's meeting the team at ten.", "Oh, I'd better hurry then."], "When is the manager meeting the team?", ["at ten", "ten", "at 10", "ten o'clock", "10"]],
    ["M", ["How was your weekend?", "Great! We went hiking in the mountains.", "That sounds nice. Was the weather good?"], "What did the woman do on the weekend?", ["she went hiking", "hiking", "went hiking", "hike in the mountains", "she hiked"]],
    ["W", ["Can I borrow your car today?", "Sorry, I need it for work.", "That's okay. I'll take the bus."], "How will the woman get there?", ["by bus", "take the bus", "the bus", "bus", "she'll take the bus"]],
    ["M", ["Your phone is ringing.", "Oh, it's my mother. I'll call her back later.", "Okay, no problem."], "Who is calling the woman?", ["her mother", "mother", "her mom", "mom", "the woman's mother"]],
    ["W", ["This soup is too salty.", "Really? I'll ask the waiter for some water.", "Thank you."], "What's wrong with the soup?", ["too salty", "it's too salty", "salty", "it is salty", "it has too much salt"]],
    ["M", ["When does the bank close today?", "At five, but it's closed on Sundays.", "Good thing it's only Friday."], "When does the bank close today?", ["at five", "five", "5", "at 5", "five o'clock"]],
    ["W", ["I'm thinking about buying a new bike.", "Why? Your old one looks fine.", "The wheel is broken."], "Why does the woman want a new bike?", ["the wheel is broken", "broken wheel", "her bike is broken", "her old bike is broken", "because the wheel is broken"]],
    ["M", ["Where's Tom today?", "He's at the dentist.", "Oh no. I hope he's okay."], "Where is Tom?", ["at the dentist", "dentist", "the dentist", "at the dentist's", "he is at the dentist"]],
    ["W", ["I need to finish this report by noon.", "Do you want some help?", "Yes, please. Could you check the numbers?"], "What does the woman want the man to do?", ["check the numbers", "check numbers", "check the report", "help her", "check her numbers"]],
    ["M", ["Is the meeting still on Thursday?", "No, they moved it to Friday morning.", "Thanks. I'll change my schedule."], "When is the meeting now?", ["friday morning", "on friday", "friday", "on friday morning", "it's on friday"]],
    ["W", ["Do you have any plans for the holiday?", "We're visiting my grandparents in Osaka.", "That sounds like fun."], "Who is the man going to visit?", ["his grandparents", "grandparents", "my grandparents", "his grandma and grandpa", "grandma and grandpa"]],
    ["M", ["I'd like to return this shirt.", "Do you have the receipt?", "Yes, here it is."], "What does the woman ask for?", ["the receipt", "receipt", "a receipt", "for the receipt", "his receipt"]],
    ["W", ["It's so cold in here.", "I'll turn off the air conditioner.", "Thanks, that's much better."], "What will the man do?", ["turn off the air conditioner", "turn it off", "turn off the air conditioning", "turn off the air con", "turn off the ac"]],
    ["M", ["How do you get to work every day?", "I ride my bike. It only takes ten minutes.", "That's really close."], "How long does it take her to get to work?", ["ten minutes", "10 minutes", "about ten minutes", "it takes ten minutes", "ten"]],
    ["W", ["Would you like some coffee?", "I'd love some, but no sugar, please.", "No problem."], "How does the man want his coffee?", ["no sugar", "without sugar", "with no sugar", "no sugar please", "he doesn't want sugar"]],
    ["M", ["Why are you wearing a suit today?", "I have a job interview this afternoon.", "Good luck!"], "Why is the woman wearing a suit?", ["she has a job interview", "job interview", "interview", "for an interview", "because she has an interview"]],
    ["W", ["Excuse me, how far is the airport?", "It's about thirty minutes by taxi.", "Thank you very much."], "How far is the airport?", ["thirty minutes", "30 minutes", "thirty minutes by taxi", "about thirty minutes", "half an hour"]],
    ["M", ["I can't find my glasses.", "They're on the kitchen table.", "Oh, there they are. Thanks!"], "Where are the man's glasses?", ["on the kitchen table", "kitchen table", "in the kitchen", "on the table", "kitchen"]],
    ["W", ["The movie starts at eight.", "Then we should leave at seven.", "Okay, I'll be ready."], "When should they leave?", ["at seven", "seven", "7", "at 7", "seven o'clock"]],
    ["M", ["Do you like your new apartment?", "Yes, but it's far from the station.", "That must be hard in the morning."], "What is the problem with the apartment?", ["far from the station", "it's far from the station", "too far", "it is far from the station", "far from station"]]
  ];
  var D = Ds.map(function (d, i) {
    var other = d[0] === "W" ? "M" : "W";
    var spk = [d[0], other, d[0]];
    var turns = d[1].map(function (t, k) { return { spk: spk[k], text: t }; });
    return { id: 'D-' + String(i + 1).padStart(4, '0'), part: 'D', turns: turns, question: d[2], accepted: d[3], words: wc(d[1].join(' ')), tags: [] };
  });

  /* ---------- F: Sentence Completion ---------- */
  // [文(____が空欄), accepted, 品詞]
  var Fs = [
    ["We need to ____ a table for six at the restaurant.", ["reserve", "book"], "verb"],
    ["It's a very ____ day, so let's go to the beach.", ["sunny", "hot", "warm", "nice", "beautiful", "lovely"], "adjective"],
    ["____ you please turn down the music?", ["could", "can", "would", "will"], "verb"],
    ["She speaks English very ____.", ["well", "fluently"], "adverb"],
    ["Please put your coat on the ____ by the door.", ["hook", "chair", "rack", "hanger", "table"], "noun"],
    ["I forgot to ____ the door when I left.", ["lock", "close", "shut"], "verb"],
    ["The soup is too hot. Wait until it ____ down.", ["cools"], "verb"],
    ["My brother is much ____ than me, so he plays basketball.", ["taller", "bigger", "older", "stronger"], "adjective"],
    ["We usually have dinner ____ seven o'clock.", ["at", "around", "by", "after", "before"], "preposition"],
    ["The meeting was ____ because the manager was sick.", ["cancelled", "canceled", "postponed", "delayed"], "verb"],
    ["Please speak more ____; I can't hear you.", ["loudly", "louder", "clearly"], "adverb"],
    ["He gave me a ____ of paper to write my name on.", ["piece", "sheet"], "noun"],
    ["____ is your favorite kind of music?", ["what", "which"], "pronoun"],
    ["She was so ____ about the trip that she couldn't sleep.", ["excited", "nervous", "happy", "worried"], "adjective"],
    ["I'd like a cup of ____ with milk, please.", ["tea", "coffee"], "noun"],
    ["The train was an hour late, so we missed our ____.", ["flight", "connection", "bus", "meeting", "appointment", "plane"], "noun"],
    ["Could you ____ me a favor and open the window?", ["do"], "verb"],
    ["They are planning to ____ to a bigger apartment next month.", ["move"], "verb"],
    ["I'm not sure, but I think the store is ____ on Mondays.", ["closed"], "adjective"],
    ["Be ____! The floor is wet and slippery.", ["careful", "cautious"], "adjective"],
    ["She has a ____ memory and never forgets a name.", ["good", "great", "strong", "perfect", "excellent", "wonderful"], "adjective"],
    ["We walked ____ the park on our way home.", ["through", "across", "around", "past", "by"], "preposition"],
    ["He hasn't decided ____ to accept the job offer.", ["whether", "how", "when"], "conjunction"],
    ["The weather ____ nice this weekend, so we're going camping.", ["looks", "seems", "is"], "verb"],
    ["I'm sorry I'm late. I got ____ in traffic.", ["stuck", "caught", "trapped"], "adjective"],
    ["The company hired twenty new ____ last month.", ["employees", "workers", "people", "staff", "teachers", "engineers"], "noun"],
    ["This bag is too ____ for me to carry by myself.", ["heavy", "big", "large"], "adjective"],
    ["____ the weekend, I usually visit my grandmother.", ["on", "during", "over", "at"], "preposition"],
    ["He ____ to the gym three times a week to stay healthy.", ["goes", "walks", "runs", "drives"], "verb"],
    ["We were very ____ with the service at the hotel.", ["happy", "pleased", "satisfied", "impressed", "disappointed", "unhappy"], "adjective"],
    ["I'll send you the file as soon as I ____ home.", ["get", "arrive", "reach", "come"], "verb"],
    ["She was born in a small ____ near the sea.", ["town", "village", "city"], "noun"],
    ["Don't forget to ____ your seat belt in the car.", ["fasten", "buckle", "wear"], "verb"],
    ["He answered the phone ____, so I knew he was angry.", ["rudely", "angrily", "coldly"], "adverb"],
    ["What do you ____ to eat for breakfast?", ["want", "like", "prefer", "need"], "verb"],
    ["Our teacher gave us a lot of ____ for the weekend.", ["homework", "work", "assignments", "exercises"], "noun"],
    ["The new phone is ____ expensive than the old one.", ["more", "less"], "adverb"],
    ["It took me an ____ to drive to the airport because of the snow.", ["hour"], "noun"],
    ["If you're cold, you can borrow my ____.", ["jacket", "coat", "sweater"], "noun"],
    ["He's afraid ____ dogs, so he never goes to the park.", ["of"], "preposition"]
  ];
  var F = Fs.map(function (f, i) {
    var toks = f[0].trim().split(/\s+/);
    var gi = -1;
    toks.forEach(function (t, k) { if (t.indexOf('____') >= 0) gi = k; });
    var gp = gi === 0 ? 'initial' : gi === toks.length - 1 ? 'end' : 'medial';
    return { id: 'F-' + String(i + 1).padStart(4, '0'), part: 'F', sentence: f[0], accepted: f[1], pos: f[2], gap_position: gp, words: wc(f[0]) };
  });

  /* ---------- G: Dictation ---------- */
  var Gs = [
    "Open the window.", "Where are you going?", "I can't hear you.", "She's my best friend.",
    "Turn left at the corner.", "What time does it start?", "They didn't come yesterday.",
    "My brother's car is new.", "How long can I keep this book?", "We're going to visit Paris next month.",
    "Please send me the files tonight.", "He has lived here for ten years.",
    "The kids' toys are in the garage.", "Don't forget to buy some milk and eggs.",
    "Which bus goes to the airport from here?", "I'll meet you in front of the library at noon.",
    "She hasn't finished her homework because she was sick.",
    "Could you tell me how much these shoes cost?", "My parents are flying to Chicago on Tuesday morning.",
    "We've already ordered, but the food hasn't arrived yet.", "If you see Maria, please tell her I called.",
    "The flight was cancelled, so we stayed at a hotel.", "Why didn't you tell me that the meeting was moved?",
    "Our neighbors have two dogs, and they bark all night.",
    "I'm sorry, but the manager is in a meeting until three.",
    "He used to walk to school with his sister every day.",
    "After the class, we're going to have lunch at the new Italian place.",
    "My grandmother's birthday is next week, so I need to buy a gift.",
    "When the phone rang, I was cooking dinner for my friends' kids.",
    "Please remember to turn off all the lights when you leave the office tonight.",
    "The people next door are moving out at the end of the month.",
    "I wasn't sure which train to take, so I asked a guard."
  ];
  var G = Gs.map(function (t, i) {
    var w = wc(t);
    return { id: 'G-' + String(i + 1).padStart(4, '0'), part: 'G', level: lvG(w), text: t, words: w, features: [], voice: 'auto' };
  }).sort(function (a, b) { return a.words - b.words; });

  /* ---------- H: Passage Reconstruction ---------- */
  var Hs = [
    ["Robert went to a restaurant near his office on Friday. After dinner, the waiter brought the bill, but Robert couldn't find his wallet. He remembered that he had it when he came in. The waiter looked around the floor and found the wallet under the table. Robert thanked him and left a big tip.",
      ["Robert / restaurant near his office / Friday", "waiter brought the bill after dinner", "Robert couldn't find his wallet", "remembered he had it when he came in", "waiter looked around the floor", "found the wallet under the table", "Robert thanked him and left a big tip"]],
    ["Maria has a small bakery in Boston. Every morning, she wakes up at four o'clock to make bread. Last Monday, her oven stopped working, so she called her brother Paul. He fixed it in one hour. Maria was so thankful that she gave him ten fresh rolls to take home.",
      ["Maria / small bakery / Boston", "wakes up at four o'clock to make bread", "last Monday the oven stopped working", "called her brother Paul", "he fixed it in one hour", "she was thankful", "gave him ten fresh rolls"]],
    ["Tom lives in Denver and works at a bank. On Wednesday, he missed his usual train because his alarm didn't ring. He took a taxi, but there was a lot of traffic. He arrived thirty minutes late. His boss wasn't angry, and Tom bought a new alarm clock that evening.",
      ["Tom / Denver / works at a bank", "Wednesday: missed his usual train", "alarm didn't ring", "took a taxi but heavy traffic", "arrived thirty minutes late", "boss wasn't angry", "bought a new alarm clock that evening"]],
    ["Emma's dog, Max, ran out of the house on Saturday because the gate was open. She looked for him in the park for two hours. A kind neighbor called her at six o'clock. He had found Max near the library. Emma was so happy that she closed the gate carefully from then on.",
      ["Emma's dog Max / Saturday", "ran out because the gate was open", "looked for him in the park for two hours", "a kind neighbor called at six o'clock", "found Max near the library", "Emma was happy", "closes the gate carefully from then on"]],
    ["Kenji wanted to surprise his mother on her sixtieth birthday. He asked his sister Yuki to take their mother out for lunch. While they were away, Kenji cooked her favorite curry and put up balloons. When they came home, his mother cried and said it was the best birthday ever.",
      ["Kenji / mother's sixtieth birthday / surprise", "asked his sister Yuki to take mother out for lunch", "while they were away", "Kenji cooked her favorite curry", "put up balloons", "mother cried when they came home", "said it was the best birthday ever"]],
    ["Lisa moved to Seattle in January and didn't know anyone. She joined a book club at the local library. At first, she was too shy to talk. After three meetings, she made two friends, Anna and Carol. Now they meet for coffee every Sunday morning.",
      ["Lisa / moved to Seattle in January", "didn't know anyone", "joined a book club at the library", "too shy to talk at first", "after three meetings made two friends Anna and Carol", "now they meet for coffee every Sunday morning"]]
  ];
  var H = Hs.map(function (h, i) {
    return { id: 'H-' + String(i + 1).padStart(4, '0'), part: 'H', passage: h[0], words: wc(h[0]), key_points: h[1] };
  });

  window.ITEMS = { B: B, C: C, D: D, F: F, G: G, H: H };
})();
