export const experiences = {
  Energy: [
    [
      "Constant tiredness",
      "Even a full night’s sleep doesn’t always feel like enough.",
    ],
    [
      "Low energy by evening",
      "Getting through the day can take everything you have.",
    ],
    [
      "Breathlessness on stairs",
      "A familiar flight of stairs feels harder than it used to.",
    ],
    [
      "Feeling cold often",
      "Reaching for a layer when everyone else feels comfortable.",
    ],
    ["Dizziness", "Those moments when you need to pause and steady yourself."],
  ],
  Body: [
    ["Hair fall", "More strands on the brush. More questions on your mind."],
    ["Weak nails", "Nails that split or break a little too easily."],
    ["Pale skin", "Noticing a change in your usual colour."],
    ["Body aches", "Everyday aches that ask you to slow down."],
    ["Cramps", "Discomfort that interrupts an ordinary day."],
    ["Weak immunity", "Feeling like you’re always catching something."],
  ],
  Mind: [
    ["Brain fog", "The thought is there. Finding it feels harder."],
    ["Mood swings", "Some days feel like an emotional rollercoaster."],
    ["Poor sleep", "Tired all day. Wide awake when it’s time to rest."],
    ["Frequent headaches", "A recurring headache that gets in the way."],
  ],
  Routine: [
    ["Skipped supplements", "Good intentions. Another forgotten tablet."],
    [
      "Tablets feel like medicine",
      "Everyday nutrition shouldn’t feel like treatment.",
    ],
    [
      "Powders feel like a chore",
      "One more thing to mix into an already full day.",
    ],
  ],
};
export const symptomGroups = {
  Energy: [
    "Dizziness",
    "Constant tiredness",
    "Low energy by evening",
    "Feeling cold often",
    "Breathlessness",
  ],
  Body: [
    "Hair fall",
    "Weak nails",
    "Pale skin",
    "Body aches",
    "Cramps",
    "Weak immunity",
  ],
  Mind: ["Brain fog", "Mood swings", "Poor sleep", "Headaches"],
  Routine: ["Inconsistent supplements", "Other"],
};
export const sources = {
  nin: { name: "ICMR–NIN", url: "https://www.nin.res.in/" },
  who: { name: "WHO", url: "https://www.who.int/tools/elena" },
  nfhs: {
    name: "NFHS-5 · 2019–21 · MoHFW",
    url: "https://rchiips.org/nfhs/NFHS-5Reports/NFHS-5_INDIA_REPORT.pdf",
  },
  bone: {
    name: "Kalkwarf & Specker · 2002",
    url: "https://pubmed.ncbi.nlm.nih.gov/?term=Kalkwarf+Specker+2002+lactation",
  },
  iof: {
    name: "International Osteoporosis Foundation",
    url: "https://www.osteoporosis.foundation/",
  },
};
const menopause = {
  nutrients: ["Calcium", "Vitamin D", "Protein", "Magnesium", "Folate & B12"],
  body: "Menopause is confirmed 12 months after the last period, at a median age of about 51. Perimenopause is the years of irregular cycles before that.",
  tips: "Make space for calcium-rich foods and varied protein sources in your daily meals.",
  doctor: "If mood or sleep changes are heavy, speak to a gynaecologist.",
  feelings:
    "Mood and sleep can change with hormones. Nutrients do not treat this.",
  source: "who",
  points: ["bone", "muscle"],
};
export const stages = [
  {
    id: "menstruating",
    title: "18+ & menstruating",
    short: "Your everyday",
    icon: "flower",
    nutrients: ["Iron", "Folate & B12", "Vitamin D", "Calcium"],
    body: "Monthly blood loss makes iron a key nutrient. Peak bone mass is built in adolescence and early adulthood, so calcium and vitamin D now support bone health for decades.",
    tips: "Vitamin C helps iron absorption. Tea and coffee, calcium and phytates reduce it, so have tea between meals instead of with them.",
    doctor:
      "Ask whether blood tests for iron, B12 or vitamin D are appropriate for you. Share changes in bleeding, energy or sleep.",
    feelings:
      "Fatigue, mood and sleep changes can have many causes. These feelings alone do not identify a nutritional deficiency.",
    source: "nin",
    points: ["blood", "bone"],
  },
  {
    id: "planning",
    title: "Planning pregnancy",
    short: "A new beginning",
    icon: "sprout",
    nutrients: ["Folate & B12"],
    body: "WHO recommends folic acid 400 micrograms daily starting as early as possible, ideally before conception, to help prevent neural tube defects. The neural tube forms in the first month of pregnancy.",
    tips: "Build varied meals around vegetables, dal, whole grains and calcium-rich foods. Food does not replace doctor-recommended folic acid.",
    doctor: "Talk to your doctor before conceiving.",
    feelings:
      "Changes in fatigue, mood or sleep are worth discussing with your doctor. They are not a way to diagnose pregnancy or deficiency.",
    source: "who",
    points: ["blood", "brain"],
  },
  {
    id: "pregnant",
    title: "Pregnant",
    short: "Growing together",
    icon: "heart",
    nutrients: [
      "Iron",
      "Folate & B12",
      "Calcium",
      "Protein",
      "Vitamin D",
      "Iodine",
    ],
    body: "WHO recommends daily iron (30–60 mg) with 400 micrograms folic acid for pregnant women to prevent maternal anaemia, low birth weight and preterm birth. Doses change if anaemia is diagnosed, and that is a doctor’s decision.",
    tips: "Choose varied meals with dal, vegetables, grains and calcium-rich foods. Discuss individual needs with your antenatal care team.",
    doctor:
      "Do not start or change supplements in pregnancy without your doctor. DAYLI products are not prenatal supplements.",
    feelings:
      "Fatigue, mood and sleep can change during pregnancy. Speak to your antenatal care team about persistent or worrying symptoms.",
    source: "who",
    points: ["blood", "bone"],
  },
  {
    id: "new-mom",
    title: "New mom",
    short: "Care for you, too",
    icon: "heart",
    nutrients: [
      "Calcium",
      "Protein",
      "Iron",
      "Folate & B12",
      "Iodine",
      "Vitamin D",
    ],
    body: "During breastfeeding the body draws calcium from the mother’s bones to make milk. Women lose roughly 3–7% bone density temporarily, and it is rebuilt after weaning.",
    tips: "Extra calcium does not prevent this temporary loss, but daily calcium needs stay high, so keep eating calcium-rich foods. Also matter: protein, iron (recovery after delivery), B12, iodine, vitamin D, fluids.",
    doctor:
      "Ask about recovery after delivery, food intake and persistent symptoms. Breastfeeding does not mean your bones are damaged.",
    feelings:
      "Recovery, feeding and disrupted sleep can affect how you feel. Speak to your doctor if mood or sleep changes affect your life.",
    source: "bone",
    points: ["bone", "muscle"],
  },
  {
    id: "perimenopause",
    title: "Perimenopause",
    short: "A changing rhythm",
    icon: "moon",
    ...menopause,
  },
  {
    id: "menopause",
    title: "Menopause",
    short: "Your next chapter",
    icon: "sun",
    ...menopause,
  },
  {
    id: "post",
    title: "Post-menopause",
    short: "Strong for what’s next",
    icon: "leaf",
    nutrients: ["Calcium", "Vitamin D", "Protein"],
    body: "Bone loss speeds up in the first 5–7 years after menopause. Estimates range up to roughly 10–20% and vary a lot between women.",
    tips: "ICMR recommends 1,200 mg calcium daily after menopause. IOF recommends 800–1,000 IU vitamin D daily for adults 60+. The ICMR–NIN adult protein RDA is 0.83 g per kg body weight per day. Protein helps bone only when calcium intake is also adequate.",
    doctor:
      "Food first, supplements only to fill gaps, with your doctor. Add strength training, walking, and ask about a bone density scan.",
    feelings:
      "Fatigue, mood and sleep changes have many causes. They are worth discussing with your doctor.",
    source: "iof",
    points: ["bone", "muscle"],
  },
];
export const nutrients = [
  {
    name: "Iron",
    subtitle: "A little oxygen, everywhere.",
    does: "Carries oxygen in blood.",
    where: "Blood and the tissues it supplies.",
    food: "Dal, leafy greens and sesame. Pair plant iron with citrus or other vitamin C foods.",
    icon: "drop",
  },
  {
    name: "Folate & B12",
    subtitle: "Small nutrients. Essential roles.",
    does: "Help make red blood cells; B12 supports nerves.",
    where: "Blood cells and the nervous system.",
    food: "Folate: leafy greens and dal. B12: milk, curd, paneer and fortified foods. Plant foods are not a reliable source of B12.",
    icon: "spark",
  },
  {
    name: "Vitamin D",
    subtitle: "A partner for your bones.",
    does: "Helps absorb calcium.",
    where: "The gut and bones.",
    food: "Labelled fortified milk and foods. Food sources are limited; discuss individual needs with your doctor.",
    icon: "sun",
  },
  {
    name: "Calcium",
    subtitle: "More than strong bones.",
    does: "Supports bones, teeth and muscle function.",
    where: "Bones, teeth and muscles.",
    food: "Milk, curd, paneer, ragi and sesame.",
    icon: "bone",
  },
  {
    name: "Protein",
    subtitle: "Everyday building blocks.",
    does: "Maintains muscle and bone.",
    where: "Muscles, bones and other tissues.",
    food: "Dal, beans, milk, curd, paneer and soy foods.",
    icon: "leaf",
  },
  {
    name: "Magnesium",
    subtitle: "Quietly doing a lot.",
    does: "Supports muscle, nerve and bone function.",
    where: "Muscles, nerves and bones.",
    food: "Dal, leafy greens, nuts, seeds and whole grains.",
    icon: "flower",
  },
  {
    name: "Iodine",
    subtitle: "A little goes a long way.",
    does: "Contributes to normal thyroid hormone production.",
    where: "The thyroid gland.",
    food: "Iodised salt, used within recommended salt limits. Ask your doctor about pregnancy needs.",
    icon: "drop",
  },
];
export const faqs = [
  [
    "Is DAYLI a medicine?",
    "No. It supports everyday nutrition and does not replace prescribed treatment. Our daily functional chocolate is in development.",
  ],
  [
    "Does it cost to join?",
    "Joining the DD Movement is free. No purchase is required.",
  ],
  [
    "What happens to my data?",
    "With your consent, your responses help DAYLI understand everyday health experiences and shape products. Read our Privacy page before sharing. You can request deletion through the contact route once registration is connected.",
  ],
  [
    "When does DAYLI launch?",
    "We’re building with the community first. A launch date has not been announced. Members will hear about next steps when they are confirmed.",
  ],
  [
    "Can men join?",
    "Yes. If a woman matters to you, you belong here. Sons, husbands, boyfriends, brothers and friends are welcome.",
  ],
  [
    "Who is behind this?",
    "DAYLI was started by Bhumesh after conversations with his mother became conversations with 100+ women. A problem noticed at home. A solution being shaped for Indian women.",
  ],
];
