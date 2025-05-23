
import type { BlogPost, Quiz, QuizQuestion, QuizOption, StudyTopic, StudyTopicSection, UserData, UserQuizProgress } from '../types';
import { QuizLevel } from '../types';
import { LOCAL_STORAGE_USER_DATA_KEY } from '../constants';

// Mock Data
const mockBlogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Understanding Epignosis: The Depth of Knowing Christ',
    author: 'Dr. Theophilus Veritas',
    date: '2024-07-15T10:00:00Z',
    imageUrl: 'https://picsum.photos/seed/blog1/600/400',
    summary: 'Explore the profound meaning of "epignosis" and its significance in the believer\'s journey to truly know Jesus Christ. This post delves deeper into the nuances of this critical Greek term.',
    content: `
      <p>Epignosis (ἐπίγνωσIS) is a Greek term that denotes a precise, full, and thorough knowledge. In the New Testament, it often refers to a deeper, more intimate understanding of God and His will, moving beyond mere factual awareness ('gnosis') to experiential and transformative knowledge. This post delves into scriptural references and theological insights on how believers can cultivate this transformative knowledge of Christ.</p>
      <h3>Distinguishing Epignosis from Gnosis</h3>
      <p>While 'gnosis' refers to general knowledge or understanding, 'epignosis' signifies a more complete, accurate, and comprehensive knowledge. It's the difference between knowing about someone and truly knowing them personally. In a spiritual context, epignosis is crucial for maturity and effective Christian living. It involves not just intellectual assent but a heartfelt embrace of truth that shapes one's character and conduct.</p>
      <h3>Key Scriptures on Epignosis:</h3>
      <ul>
        <li><strong>Philippians 1:9-11:</strong> Paul prays that the Philippians' love may abound more and more in knowledge (epignosis) and all discernment, so they may approve what is excellent and be pure and blameless for the day of Christ.</li>
        <li><strong>Colossians 1:9-10:</strong> Paul desires for the Colossians to be filled with the knowledge (epignosis) of God’s will in all spiritual wisdom and understanding, so as to walk in a manner worthy of the Lord, fully pleasing to him, bearing fruit in every good work and increasing in the knowledge (epignosis) of God.</li>
        <li><strong>Ephesians 1:17-19:</strong> The prayer here is for the Spirit of wisdom and of revelation in the knowledge (epignosis) of Him, having the eyes of their hearts enlightened.</li>
        <li><strong>2 Peter 1:2-3:</strong> Grace and peace be multiplied to you in the knowledge (epignosis) of God and of Jesus our Lord. His divine power has granted to us all things that pertain to life and godliness, through the knowledge (epignosis) of him who called us to his own glory and excellence.</li>
      </ul>
      <h3>Cultivating Epignosis</h3>
      <p>Cultivating epignosis involves several key practices:
        <ol>
          <li><strong>Diligent Study of Scripture:</strong> The Bible is the primary source of God's revelation. Engaging with it deeply and consistently is foundational.</li>
          <li><strong>Prayer for Understanding:</strong> As seen in Paul's prayers, we should ask God for spiritual wisdom and revelation.</li>
          <li><strong>Obedience to God's Commands:</strong> Living out what we know deepens our understanding and experience of God.</li>
          <li><strong>Fellowship with Other Believers:</strong> Learning and growing together within the community of faith provides encouragement and shared insights.</li>
          <li><strong>Meditation and Reflection:</strong> Taking time to ponder God's truths allows them to penetrate our hearts and minds more fully.</li>
        </ol>
      </p>
      <p>Join us as we unpack the richness of epignosis and its power to transform our faith, leading to a deeper relationship with Jesus Christ and a life that truly honors Him.</p>
    `,
    tags: ['theology', 'epignosis', 'spiritual growth', 'greek words']
  },
  {
    id: '2',
    title: 'The Role of the Holy Spirit in Gaining Spiritual Knowledge',
    author: 'Pastor Grace Illuminas',
    date: '2024-07-22T14:30:00Z',
    imageUrl: 'https://picsum.photos/seed/blog2/600/400',
    summary: 'How does the Holy Spirit guide us into all truth and help us understand the deep things of God? This article explores the Spirit\'s vital role in illuminating scripture and transforming hearts.',
    content: `
      <p>The Holy Spirit is our divine teacher, counselor, and guide, indispensable for true spiritual understanding. Without His work, the truths of God can remain obscure or merely intellectual. This article explores key biblical passages to illuminate how the Spirit works in us to reveal God's wisdom and foster genuine epignosis.</p>
      <h3>The Spirit as Teacher and Revealer</h3>
      <ul>
        <li><strong>John 16:13:</strong> Jesus promised, "When the Spirit of truth comes, he will guide you into all the truth, for he will not speak on his own authority, but whatever he hears he will speak, and he will declare to you the things that are to come." This highlights the Spirit's role in leading believers into the fullness of God's truth.</li>
        <li><strong>1 Corinthians 2:10-14:</strong> Paul explains, "...these things God has revealed to us through the Spirit. For the Spirit searches everything, even the depths of God... The natural person does not accept the things of the Spirit of God, for they are folly to him, and he is not able to understand them because they are spiritually discerned." This passage underscores that spiritual truths require spiritual discernment, which is a gift of the Holy Spirit.</li>
        <li><strong>Ephesians 1:17:</strong> Paul prays for believers to receive "the Spirit of wisdom and of revelation in the knowledge of him." This emphasizes that knowing God deeply is a work of the Spirit.</li>
      </ul>
      <h3>How the Spirit Illuminates Scripture</h3>
      <p>Illumination is the work of the Holy Spirit that enables believers to understand and apply the Word of God. While the Bible is objectively true, its spiritual significance and personal application become clear through the Spirit's ministry. He does not add new revelation beyond Scripture but helps us grasp the meaning and relevance of what is already written. This involves:
        <ul>
          <li>Opening our minds to understand the Scriptures (Luke 24:45).</li>
          <li>Bringing conviction of sin, righteousness, and judgment (John 16:8).</li>
          <li>Testifying about Christ (John 15:26).</li>
          <li>Transforming us into Christ's likeness as we behold His glory in the Word (2 Corinthians 3:18).</li>
        </ul>
      </p>
      <h3>Practical Ways to Be Receptive to the Spirit's Teaching:</h3>
      <ol>
        <li><strong>Prayer for Illumination:</strong> Before reading the Bible, ask the Holy Spirit to open your heart and mind to His truth (Psalm 119:18).</li>
        <li><strong>Humility:</strong> Approach Scripture with a teachable spirit, willing to submit to its authority.</li>
        <li><strong>Obedience:</strong> A willingness to obey what is learned creates a greater capacity for understanding.</li>
        <li><strong>Meditation:</strong> Reflect deeply on passages, asking the Spirit to reveal their meaning and application.</li>
        <li><strong>Community:</strong> Discussing Scripture with other believers can provide new insights as the Spirit works through the body of Christ.</li>
      </ol>
      <p>The Holy Spirit's ministry is essential for every believer seeking to grow in the grace and knowledge of our Lord Jesus Christ. By depending on Him, we can move from a superficial understanding to a deep, life-changing encounter with the living God through His Word.</p>
    `,
    tags: ['holy spirit', 'revelation', 'discipleship', 'bible study', 'illumination']
  },
  {
    id: '3',
    title: 'The Centrality of the Cross in Christian Faith',
    author: 'Dr. cruciform Theo',
    date: '2024-08-01T09:00:00Z',
    imageUrl: 'https://picsum.photos/seed/blog3/600/400',
    summary: 'The cross of Christ is not merely a historical event but the very heart of the Christian message. This article explores its profound significance for salvation, reconciliation, and Christian living.',
    content: `
      <p>For Christians, the cross is the most profound symbol of their faith. It represents not suffering and death in isolation, but the pivotal act of God's redemptive plan for humanity. Understanding its centrality is crucial for a robust and biblically grounded faith.</p>
      <h3>Atonement and Sacrifice</h3>
      <p>At its core, the cross is about atonement – God's provision for reconciling sinful humanity to Himself. The Old Testament sacrificial system, with its emphasis on blood sacrifice for the remission of sins (Leviticus 17:11), pointed forward to the ultimate sacrifice. Jesus Christ, the Lamb of God (John 1:29), offered Himself as a perfect, once-for-all sacrifice for sins (Hebrews 9:26-28, 10:10-14). His death on the cross satisfied the righteous demands of God's justice against sin.</p>
      <p>Key aspects of the atonement include:
        <ul>
          <li><strong>Propitiation:</strong> Appeasing God's wrath against sin (Romans 3:25, 1 John 2:2).</li>
          <li><strong>Expiation:</strong> The removal or covering of sin's guilt.</li>
          <li><strong>Redemption:</strong> Buying back or setting free from slavery to sin (Ephesians 1:7, Galatians 3:13).</li>
          <li><strong>Reconciliation:</strong> Restoring a broken relationship between God and humanity (2 Corinthians 5:18-19, Colossians 1:20-22).</li>
        </ul>
      </p>
      <h3>Victory Over Sin, Death, and Satan</h3>
      <p>The cross was not a defeat but a decisive victory. Through His death and resurrection, Jesus Christ:
        <ul>
          <li><strong>Conquered Sin:</strong> He broke the power of sin in the lives of believers (Romans 6:6-11).</li>
          <li><strong>Defeated Death:</strong> He triumphed over physical and spiritual death, securing eternal life for those who believe (1 Corinthians 15:54-57, Hebrews 2:14-15).</li>
          <li><strong>Disarmed Satan:</strong> He nullified the power of the demonic forces (Colossians 2:15, 1 John 3:8).</li>
        </ul>
      </p>
      <h3>The Cross and Christian Living</h3>
      <p>The message of the cross profoundly shapes the believer's life:
        <ul>
          <li><strong>Foundation of Faith:</strong> Our salvation and relationship with God are based entirely on Christ's finished work on the cross (1 Corinthians 2:2).</li>
          <li><strong>Motivation for Holiness:</strong> Understanding the cost of our redemption motivates us to live lives pleasing to God (1 Peter 1:15-19).</li>
          <li><strong>Call to Self-Denial:</strong> Jesus calls His followers to take up their own cross and follow Him, signifying a life of surrender and sacrifice (Luke 9:23).</li>
          <li><strong>Power for Service:</strong> The "word of the cross is the power of God" (1 Corinthians 1:18), empowering us for witness and service.</li>
          <li><strong>Source of Humility and Unity:</strong> The cross demonstrates God's immense love and should lead to humility and unity among believers (Philippians 2:1-11).</li>
        </ul>
      </p>
      <p>The cross stands as an eternal testament to God's love, justice, and wisdom. It is the ground of our hope, the source of our forgiveness, and the pattern for our lives. As believers, we are called to "boast only in the cross of our Lord Jesus Christ" (Galatians 6:14).</p>
    `,
    tags: ['cross', 'atonement', 'salvation', 'theology', 'christian living']
  },
  {
    id: '4',
    title: 'Prayer: A Dialogue with the Divine',
    author: 'Anna Preces',
    date: '2024-08-10T11:00:00Z',
    imageUrl: 'https://picsum.photos/seed/blog4/600/400',
    summary: 'Prayer is more than a religious ritual; it is a vital, ongoing conversation with God. This post explores the nature, importance, types, and practice of prayer in the Christian life.',
    content: `
      <p>Prayer is one of the most fundamental aspects of the Christian faith. It is our direct line of communication with the Creator of the universe, a privilege made possible through Jesus Christ. Far from being a monologue or a mere wish list, true prayer is a dynamic dialogue with God.</p>
      <h3>The Nature and Importance of Prayer</h3>
      <p>At its heart, prayer is an expression of our relationship with God. It acknowledges His sovereignty, our dependence, and the intimacy He desires with us. The Bible consistently emphasizes the importance of prayer:
        <ul>
          <li><strong>Commanded by God:</strong> "Pray without ceasing" (1 Thessalonians 5:17); "Continue steadfastly in prayer" (Colossians 4:2).</li>
          <li><strong>Modeled by Jesus:</strong> The Gospels frequently show Jesus withdrawing to pray, even in the midst of a demanding ministry (Mark 1:35, Luke 6:12). He also taught His disciples how to pray (Matthew 6:9-13).</li>
          <li><strong>Essential for Spiritual Life:</strong> Just as physical breath is necessary for physical life, prayer is essential for spiritual vitality and growth.</li>
        </ul>
      </p>
      <h3>Types of Prayer (ACTS Model)</h3>
      <p>A common acronym to remember different facets of prayer is ACTS:
        <ul>
          <li><strong>Adoration:</strong> Praising and worshiping God for who He is – His attributes, character, and majesty (Psalm 95:6, Revelation 4:11).</li>
          <li><strong>Confession:</strong> Honestly acknowledging and repenting of our sins before God, seeking His forgiveness and cleansing (Psalm 51, 1 John 1:9).</li>
          <li><strong>Thanksgiving:</strong> Expressing gratitude to God for His blessings, His goodness, His answers to prayer, and His constant presence (Philippians 4:6, Ephesians 5:20).</li>
          <li><strong>Supplication:</strong> Making our requests known to God. This includes:
            <ul>
              <li><em>Petition:</em> Praying for our own needs (Matthew 7:7-11).</li>
              <li><em>Intercession:</em> Praying on behalf of others (1 Timothy 2:1-2, James 5:16).</li>
            </ul>
          </li>
        </ul>
      </p>
      <h3>Practicing Effective Prayer</h3>
      <p>While there is no magic formula for prayer, certain attitudes and practices can enrich our prayer lives:
        <ul>
          <li><strong>Faith:</strong> Believing that God hears and answers prayer according to His will (Hebrews 11:6, Mark 11:24).</li>
          <li><strong>Sincerity:</strong> Praying from the heart, rather than merely reciting words (Matthew 6:7).</li>
          <li><strong>Persistence:</strong> Not giving up easily in prayer (Luke 18:1-8).</li>
          <li><strong>According to God's Will:</strong> Aligning our desires with God's purposes (1 John 5:14-15). This requires knowing His will through Scripture.</li>
          <li><strong>In Jesus' Name:</strong> Praying with the authority and on the merits of Jesus Christ (John 14:13-14).</li>
          <li><strong>Listening:</strong> Prayer is a two-way conversation. Take time to be still and listen for God's guidance.</li>
        </ul>
      </p>
      <h3>Hindrances to Prayer</h3>
      <p>The Bible also speaks of things that can hinder our prayers, such as unconfessed sin (Psalm 66:18), unforgiveness (Mark 11:25), and wrong motives (James 4:3).</p>
      <p>Developing a consistent and meaningful prayer life is a journey. It requires discipline, but the rewards are immeasurable: a deeper relationship with God, spiritual strength, guidance, and the joy of seeing God work in response to our prayers. Let us approach the throne of grace with confidence, knowing that our Heavenly Father delights to hear from His children.</p>
    `,
    tags: ['prayer', 'spiritual disciplines', 'christian living', 'communication with God']
  },
  {
    id: '5',
    title: 'Biblical Hope: More Than Wishful Thinking',
    author: 'Elpis Aeterna',
    date: '2024-08-18T16:00:00Z',
    imageUrl: 'https://picsum.photos/seed/blog5/600/400',
    summary: 'In a world often filled with uncertainty, biblical hope stands as a firm anchor for the believer\'s soul. This article distinguishes true hope from mere optimism and explores its foundations and impact.',
    content: `
      <p>The word "hope" in contemporary language often implies uncertainty or wishful thinking, as in "I hope it doesn't rain." However, biblical hope (Greek: <em>elpis</em>) is vastly different. It is a confident expectation and firm assurance regarding things that are unseen but true, based on the character and promises of God.</p>
      <h3>Defining Biblical Hope</h3>
      <p>Biblical hope is not a desire for a possible future outcome but a settled conviction about a guaranteed future. It is:
        <ul>
          <li><strong>Certain:</strong> Its fulfillment is as sure as God's faithfulness. "We have this as a sure and steadfast anchor of the soul, a hope that enters into the inner place behind the curtain" (Hebrews 6:19).</li>
          <li><strong>Future-Oriented:</strong> While it impacts the present, its ultimate focus is on God's future promises, particularly the return of Christ, the resurrection, and eternal life (Titus 2:13, 1 Peter 1:3-4).</li>
          <li><strong>Based on God:</strong> Its foundation is not in circumstances or human ability, but in God's unchanging character, His power, and His specific promises revealed in Scripture (Romans 15:13, Hebrews 10:23).</li>
        </ul>
      </p>
      <h3>The Foundation of Our Hope</h3>
      <p>The Christian's hope is not groundless. It is firmly rooted in:
        <ol>
          <li><strong>God's Character:</strong> He is faithful, loving, sovereign, and all-powerful. He cannot lie and He keeps His promises (Numbers 23:19, Titus 1:2).</li>
          <li><strong>The Work of Jesus Christ:</strong> His death and resurrection are the cornerstone of our hope. His resurrection guarantees our own future resurrection and eternal life (1 Corinthians 15:19-22, 1 Peter 1:3).</li>
          <li><strong>The Promises of Scripture:</strong> God's Word is filled with promises that fuel our hope, such as the promise of His presence, provision, guidance, and ultimate victory over evil (Romans 8:28, Philippians 4:19, Revelation 21:3-4).</li>
          <li><strong>The Indwelling Holy Spirit:</strong> The Holy Spirit is given as a "guarantee" or "down payment" of our future inheritance (Ephesians 1:13-14, 2 Corinthians 1:22).</li>
        </ol>
      </p>
      <h3>The Impact of Hope on the Believer's Life</h3>
      <p>Biblical hope is not passive; it actively shapes our present reality:
        <ul>
          <li><strong>Perseverance in Trials:</strong> Hope enables believers to endure suffering and hardship with patience and joy, knowing that present difficulties are temporary and working for an eternal glory (Romans 5:3-5, James 1:2-4, 12).</li>
          <li><strong>Purity and Holiness:</strong> The expectation of Christ's return and our future glorification motivates us to live holy lives (1 John 3:2-3).</li>
          <li><strong>Courage and Boldness:</strong> Hope in God's ultimate triumph gives us courage to live for Him and share our faith, even in the face of opposition (Acts 4:13, 29).</li>
          <li><strong>Joy and Peace:</strong> "May the God of hope fill you with all joy and peace in believing, so that by the power of the Holy Spirit you may abound in hope" (Romans 15:13).</li>
          <li><strong>Love for Others:</strong> Hope in eternal life frees us from self-preservation and empowers us to love and serve others sacrificially.</li>
        </ul>
      </p>
      <p>In a world that often seems hopeless, biblical hope is a radical and transformative reality. It is not a denial of present struggles but a confident assurance that God is in control and His ultimate purposes will prevail. Let us hold fast to the confession of our hope without wavering, for He who promised is faithful (Hebrews 10:23).</p>
    `,
    tags: ['hope', 'eschatology', 'christian living', 'faith', 'perseverance']
  },
];

const mockQuizzes: Quiz[] = [
  {
    id: 'q1',
    title: 'Foundations of Faith',
    description: 'Test your knowledge on the basic doctrines of Christianity. (Approx. 3-4 minutes)',
    level: QuizLevel.Beginner,
    imageUrl: 'https://picsum.photos/seed/quiz1/400/250',
    questions: [
      { id: 'q1_1', text: 'Who is considered the Son of God in Christianity?', options: [{id:'a',text:'Moses'}, {id:'b',text:'Abraham'}, {id:'c',text:'Jesus Christ'}, {id:'d',text:'David'}], correctOptionId: 'c', explanation: 'Jesus Christ is recognized as the Son of God (John 3:16). He is the second person of the Trinity.' },
      { id: 'q1_2', text: 'What is the central message of the Gospel?', options: [{id:'a',text:'Love your neighbor'}, {id:'b',text:'The Ten Commandments'}, {id:'c',text:'Salvation through faith in Jesus Christ'}, {id:'d',text:'The creation story'}], correctOptionId: 'c', explanation: 'The Gospel (Good News) is about God\'s plan of salvation for humanity through faith in Jesus Christ\'s death and resurrection (Ephesians 2:8-9).' },
      { id: 'q1_3', text: 'What are the first four books of the New Testament collectively called?', options: [{id:'a',text:'The Epistles'}, {id:'b',text:'The Gospels'}, {id:'c',text:'The Pentateuch'}, {id:'d',text:'The Prophets'}], correctOptionId: 'b', explanation: 'The first four books of the New Testament (Matthew, Mark, Luke, and John) are called the Gospels, meaning "good news," and they narrate the life, ministry, death, and resurrection of Jesus Christ.' },
      { id: 'q1_4', text: 'What is the significance of Jesus\' resurrection for Christians?', options: [{id:'a',text:'It proved He was a good teacher'}, {id:'b',text:'It fulfilled Old Testament prophecy only'}, {id:'c',text:'It signifies His victory over sin and death, and guarantees believers\' future resurrection'}, {id:'d',text:'It was a symbolic story'}], correctOptionId: 'c', explanation: 'The resurrection is central to Christian faith, demonstrating Jesus\' divine power, His victory over sin and death, and it is the basis for the believer\'s hope of eternal life and future resurrection (1 Corinthians 15).' },
      { id: 'q1_5', text: 'What is the Holy Trinity?', options: [{id:'a',text:'Three different Gods'}, {id:'b',text:'God appearing in three different modes'}, {id:'c',text:'One God existing in three co-equal and co-eternal persons: Father, Son, and Holy Spirit'}, {id:'d',text:'A council of divine beings'}], correctOptionId: 'c', explanation: 'The doctrine of the Trinity states that there is one God who eternally exists as three distinct persons: the Father, the Son (Jesus Christ), and the Holy Spirit. Each person is fully God, and there is one God.' },
    ],
  },
  {
    id: 'qGenFigures',
    title: 'Key Figures in Genesis',
    description: 'Identify prominent individuals from the book of Genesis. (Approx. 3-4 minutes)',
    level: QuizLevel.Beginner,
    imageUrl: 'https://picsum.photos/seed/quizGen/400/250',
    questions: [
        { id: 'qGF_1', text: 'Who were the first man and woman created by God?', options: [{id:'a',text:'Abraham and Sarah'}, {id:'b',text:'Isaac and Rebekah'}, {id:'c',text:'Adam and Eve'}, {id:'d',text:'Jacob and Rachel'}], correctOptionId: 'c', explanation: 'Adam and Eve are described in Genesis as the first humans created by God (Genesis 1-2).' },
        { id: 'qGF_2', text: 'Who built an ark to save his family and animals from a great flood?', options: [{id:'a',text:'Moses'}, {id:'b',text:'Noah'}, {id:'c',text:'Joseph'}, {id:'d',text:'Elijah'}], correctOptionId: 'b', explanation: 'Noah was instructed by God to build an ark to preserve life during the great flood (Genesis 6-9).' },
        { id: 'qGF_3', text: 'Who is known as the "Father of Many Nations" and was promised descendants as numerous as the stars?', options: [{id:'a',text:'Jacob'}, {id:'b',text:'Isaac'}, {id:'c',text:'Abraham'}, {id:'d',text:'Adam'}], correctOptionId: 'c', explanation: 'Abraham (originally Abram) received God\'s covenant promise that he would be the father of a multitude of nations (Genesis 17:4-5).' },
        { id: 'qGF_4', text: 'Who was Abraham\'s promised son, through whom the covenant continued?', options: [{id:'a',text:'Ishmael'}, {id:'b',text:'Esau'}, {id:'c',text:'Isaac'}, {id:'d',text:'Joseph'}], correctOptionId: 'c', explanation: 'Isaac was the son of Abraham and Sarah, born in their old age, through whom God\'s covenant promises were to be fulfilled (Genesis 21).' },
        { id: 'qGF_5', text: 'Which of Jacob\'s sons was sold into slavery by his brothers but later rose to prominence in Egypt?', options: [{id:'a',text:'Reuben'}, {id:'b',text:'Judah'}, {id:'c',text:'Benjamin'}, {id:'d',text:'Joseph'}], correctOptionId: 'd', explanation: 'Joseph, favored by his father Jacob, was sold by his jealous brothers but eventually became a powerful ruler in Egypt, saving many from famine (Genesis 37, 39-50).' },
    ]
  },
  {
    id: 'q2',
    title: 'The Gospels: Life of Christ',
    description: 'Explore key events and teachings from the life of Jesus. (Approx. 6-8 minutes)',
    level: QuizLevel.Intermediate,
    imageUrl: 'https://picsum.photos/seed/quiz2/400/250',
    questions: [
      { id: 'q2_1', text: 'In which town was Jesus born?', options: [{id:'a',text:'Jerusalem'}, {id:'b',text:'Nazareth'}, {id:'c',text:'Bethlehem'}, {id:'d',text:'Capernaum'}], correctOptionId: 'c', explanation: 'Jesus was born in Bethlehem of Judea, as prophesied (Matthew 2:1, Micah 5:2).' },
      { id: 'q2_2', text: 'How many disciples did Jesus choose as his closest apostles?', options: [{id:'a',text:'7'}, {id:'b',text:'10'}, {id:'c',text:'12'}, {id:'d',text:'3'}], correctOptionId: 'c', explanation: 'Jesus chose twelve disciples, also called apostles, to be His closest followers and to carry on His ministry (Mark 3:13-19).' },
      { id: 'q2_3', text: 'Who baptized Jesus in the Jordan River?', options: [{id:'a',text:'Peter'}, {id:'b',text:'John the Baptist'}, {id:'c',text:'Andrew'}, {id:'d',text:'Ananias'}], correctOptionId: 'b', explanation: 'John the Baptist baptized Jesus in the Jordan River at the beginning of Jesus\' public ministry (Matthew 3:13-17).' },
      { id: 'q2_4', text: 'What is the name of the famous sermon Jesus delivered on a mountainside, found in Matthew 5-7?', options: [{id:'a',text:'The Olivet Discourse'}, {id:'b',text:'The Farewell Discourse'}, {id:'c',text:'The Sermon on the Mount'}, {id:'d',text:'The Bread of Life Discourse'}], correctOptionId: 'c', explanation: 'The Sermon on the Mount contains core teachings of Jesus, including the Beatitudes and the Lord\'s Prayer (Matthew 5-7).' },
      { id: 'q2_5', text: 'Which miracle involved Jesus feeding a large crowd with a few loaves and fish?', options: [{id:'a',text:'Walking on water'}, {id:'b',text:'Healing the blind man'}, {id:'c',text:'Feeding the 5000'}, {id:'d',text:'Calming the storm'}], correctOptionId: 'c', explanation: 'Jesus miraculously fed over 5000 people with just five loaves of bread and two fish (Matthew 14:13-21).' },
      { id: 'q2_6', text: 'What event is commemorated by Christians during the Last Supper?', options: [{id:'a',text:'Jesus\' birth'}, {id:'b',text:'Jesus\' transfiguration'}, {id:'c',text:'Jesus\' institution of Communion (Eucharist)'}, {id:'d',text:'Jesus\' ascension'}], correctOptionId: 'c', explanation: 'During the Last Supper, Jesus instituted the Lord\'s Supper (Communion or Eucharist), instructing His disciples to remember His sacrifice (Matthew 26:26-29).' },
      { id: 'q2_7', text: 'On what charge was Jesus primarily crucified by the Roman authorities, according to the inscription on the cross?', options: [{id:'a',text:'Blasphemy'}, {id:'b',text:'Sedition against Rome'}, {id:'c',text:'"King of the Jews"'}, {id:'d',text:'Sorcery'}], correctOptionId: 'c', explanation: 'The inscription (titulus) placed on the cross, "Jesus of Nazareth, the King of the Jews" (John 19:19), indicated the official Roman charge, though the Sanhedrin accused Him of blasphemy.' },
      { id: 'q2_8', text: 'To whom did Jesus first appear after His resurrection, according to most Gospel accounts?', options: [{id:'a',text:'Peter'}, {id:'b',text:'The twelve disciples'}, {id:'c',text:'Mary Magdalene'}, {id:'d',text:'His mother Mary'}], correctOptionId: 'c', explanation: 'Mary Magdalene is consistently portrayed as one of the first, if not the first, to see the risen Christ (John 20:11-18, Mark 16:9).' },
      { id: 'q2_9', text: 'What is the Great Commission?', options: [{id:'a',text:'The command to love God and neighbor'}, {id:'b',text:'Jesus\' instruction to His disciples to make disciples of all nations'}, {id:'c',text:'The Beatitudes'}, {id:'d',text:'The Ten Commandments'}], correctOptionId: 'b', explanation: 'The Great Commission is Jesus\' final command to His disciples to go and make disciples of all nations, baptizing them and teaching them to obey His commands (Matthew 28:18-20).' },
    ],
  },
  {
    id: 'qActsChurch',
    title: 'The Book of Acts: Early Church',
    description: 'Test your knowledge of the early church\'s formation and expansion. (Approx. 6-8 minutes)',
    level: QuizLevel.Intermediate,
    imageUrl: 'https://picsum.photos/seed/quizActs/400/250',
    questions: [
        { id: 'qAC_1', text: 'What major event occurred on the Day of Pentecost in Acts 2?', options: [{id:'a',text:'Jesus\' ascension'}, {id:'b',text:'The stoning of Stephen'}, {id:'c',text:'The Holy Spirit descended upon the disciples'}, {id:'d',text:'Saul\'s conversion'}], correctOptionId: 'c', explanation: 'On the Day of Pentecost, the Holy Spirit was poured out on the disciples, empowering them to speak in other tongues and preach the gospel (Acts 2:1-4).' },
        { id: 'qAC_2', text: 'Who was the first Christian martyr, stoned to death for his faith?', options: [{id:'a',text:'James, son of Zebedee'}, {id:'b',text:'Peter'}, {id:'c',text:'Stephen'}, {id:'d',text:'Paul'}], correctOptionId: 'c', explanation: 'Stephen, one of the seven chosen to serve, became the first Christian martyr after delivering a powerful speech before the Sanhedrin (Acts 7).' },
        { id: 'qAC_3', text: 'What was Saul of Tarsus doing before his conversion experience on the road to Damascus?', options: [{id:'a',text:'He was a fisherman'}, {id:'b',text:'He was a tax collector'}, {id:'c',text:'He was persecuting Christians'}, {id:'d',text:'He was a Roman soldier'}], correctOptionId: 'c', explanation: 'Saul was a zealous persecutor of the early Christian church before encountering the risen Christ on the road to Damascus (Acts 9:1-2).' },
        { id: 'qAC_4', text: 'Which apostle received a vision leading him to preach the gospel to Cornelius, a Gentile centurion?', options: [{id:'a',text:'Paul'}, {id:'b',text:'John'}, {id:'c',text:'James'}, {id:'d',text:'Peter'}], correctOptionId: 'd', explanation: 'Peter received a vision (Acts 10) that taught him God shows no partiality, leading him to share the gospel with the Gentile household of Cornelius.' },
        { id: 'qAC_5', text: 'What city served as the home base for Paul\'s missionary journeys?', options: [{id:'a',text:'Jerusalem'}, {id:'b',text:'Rome'}, {id:'c',text:'Antioch (in Syria)'}, {id:'d',text:'Ephesus'}], correctOptionId: 'c', explanation: 'The church in Antioch of Syria commissioned and sent out Paul and Barnabas on their first missionary journey, and it remained a key center (Acts 13:1-3).' },
        { id: 'qAC_6', text: 'What was the main issue debated at the Jerusalem Council in Acts 15?', options: [{id:'a',text:'Whether Jesus was divine'}, {id:'b',text:'Whether Gentile believers needed to be circumcised and follow the Mosaic Law'}, {id:'c',text:'The date of Easter'}, {id:'d',text:'The authorship of the Gospels'}], correctOptionId: 'b', explanation: 'The Jerusalem Council addressed the critical question of whether Gentile converts to Christianity were required to observe Jewish ceremonial laws, like circumcision (Acts 15).' },
        { id: 'qAC_7', text: 'In what city did Paul preach on Mars Hill (Areopagus) to Greek philosophers?', options: [{id:'a',text:'Corinth'}, {id:'b',text:'Ephesus'}, {id:'c',text:'Athens'}, {id:'d',text:'Philippi'}], correctOptionId: 'c', explanation: 'Paul delivered his famous sermon about the "Unknown God" to the Epicurean and Stoic philosophers in Athens at the Areopagus (Acts 17:16-34).' },
        { id: 'qAC_8', text: 'Who were Paul\'s main companions on his first missionary journey?', options: [{id:'a',text:'Silas and Timothy'}, {id:'b',text:'Barnabas and John Mark'}, {id:'c',text:'Aquila and Priscilla'}, {id:'d',text:'Luke and Titus'}], correctOptionId: 'b', explanation: 'Barnabas and John Mark accompanied Paul on his first missionary journey (Acts 13-14).' },
        { id: 'qAC_9', text: 'Where was Paul imprisoned at the end of the Book of Acts?', options: [{id:'a',text:'Jerusalem'}, {id:'b',text:'Caesarea'}, {id:'c',text:'A deserted island'}, {id:'d',text:'Rome'}], correctOptionId: 'd', explanation: 'The Book of Acts concludes with Paul under house arrest in Rome, still proclaiming the kingdom of God and teaching about the Lord Jesus Christ (Acts 28:30-31).' },
    ]
  },
  {
    id: 'q3',
    title: 'Pauline Epistles: Core Doctrines',
    description: 'Deep dive into the theological teachings of Apostle Paul. (Approx. 9-10 minutes)',
    level: QuizLevel.Advanced,
    imageUrl: 'https://picsum.photos/seed/quiz3/400/250',
    questions: [
      { id: 'q3_1', text: 'Which Pauline epistle extensively discusses justification by faith?', options: [{id:'a',text:'Ephesians'}, {id:'b',text:'Romans'}, {id:'c',text:'1 Corinthians'}, {id:'d',text:'Philippians'}], correctOptionId: 'b', explanation: 'The book of Romans provides a detailed theological explanation of justification by faith (Romans 3-5), emphasizing that righteousness is a gift from God received through faith in Jesus Christ.' },
      { id: 'q3_2', text: 'What fruit of the Spirit is listed first in Galatians 5:22-23?', options: [{id:'a',text:'Joy'}, {id:'b',text:'Peace'}, {id:'c',text:'Love'}, {id:'d',text:'Patience'}], correctOptionId: 'c', explanation: '"But the fruit of the Spirit is love, joy, peace, patience, kindness, goodness, faithfulness..." (Galatians 5:22-23a ESV). Love is foundational.' },
      { id: 'q3_3', text: 'In Ephesians, what metaphor does Paul use to describe the Church with Christ as the head?', options: [{id:'a',text:'A building or temple'}, {id:'b',text:'A bride'}, {id:'c',text:'A body'}, {id:'d',text:'All of the above'}], correctOptionId: 'd', explanation: 'Paul uses multiple metaphors for the Church in Ephesians: the Body of Christ (Eph 1:22-23, 4:15-16), a Holy Temple (Eph 2:21-22), and the Bride of Christ (Eph 5:25-32).' },
      { id: 'q3_4', text: 'Which epistle contains the "Kenosis Hymn" (Philippians 2:5-11) describing Christ\'s self-emptying?', options: [{id:'a',text:'Romans'}, {id:'b',text:'Colossians'}, {id:'c',text:'Philippians'}, {id:'d',text:'1 Timothy'}], correctOptionId: 'c', explanation: 'Philippians 2:5-11 is a profound passage describing Christ\'s humility, incarnation, and exaltation, often referred to as the Kenosis hymn.' },
      { id: 'q3_5', text: 'In Colossians, Paul emphasizes the preeminence and sufficiency of Christ against what kind of false teaching?', options: [{id:'a',text:'Legalism (Judaizers)'}, {id:'b',text:'Gnosticism and ascetic practices'}, {id:'c',text:'Antinomianism (lawlessness)'}, {id:'d',text:'Emperor worship'}], correctOptionId: 'b', explanation: 'Paul wrote Colossians to combat a syncretistic false teaching that involved elements of Jewish legalism, Greek philosophy, angel worship, and asceticism, by highlighting the all-sufficiency and supremacy of Christ (Colossians 2).' },
      { id: 'q3_6', text: 'Which two Pauline epistles are known as the "Thessalonian Epistles" and deal significantly with eschatology (end times)?', options: [{id:'a',text:'1 & 2 Timothy'}, {id:'b',text:'Titus & Philemon'}, {id:'c',text:'1 & 2 Thessalonians'}, {id:'d',text:'Galatians & Ephesians'}], correctOptionId: 'c', explanation: '1 and 2 Thessalonians address questions and misunderstandings about the return of Christ and events related to the end times.' },
      { id: 'q3_7', text: 'What is the main theme of Paul\'s letter to Philemon?', options: [{id:'a',text:'Church order and leadership'}, {id:'b',text:'Justification by faith'}, {id:'c',text:'Forgiveness and reconciliation regarding a runaway slave'}, {id:'d',text:'The collection for the saints in Jerusalem'}], correctOptionId: 'c', explanation: 'Philemon is a personal letter from Paul appealing to Philemon to forgive and restore his runaway slave, Onesimus, who had become a Christian.' },
      { id: 'q3_8', text: 'In 1 Corinthians 15, Paul gives a detailed defense and explanation of what crucial Christian doctrine?', options: [{id:'a',text:'The Trinity'}, {id:'b',text:'The deity of Christ'}, {id:'c',text:'The resurrection of the dead'}, {id:'d',text:'The inspiration of Scripture'}], correctOptionId: 'c', explanation: '1 Corinthians 15 is the most extensive treatment of the doctrine of the resurrection in the New Testament, emphasizing its historical reality and future hope.' },
      { id: 'q3_9', text: 'The "Pastoral Epistles" (1 Timothy, 2 Timothy, Titus) primarily focus on what?', options: [{id:'a',text:'Systematic theology'}, {id:'b',text:'Apologetics against Greek philosophy'}, {id:'c',text:'Church leadership, order, and sound doctrine'}, {id:'d',text:'Paul\'s missionary strategies'}], correctOptionId: 'c', explanation: 'The Pastoral Epistles provide guidance to Timothy and Titus on matters of church organization, qualifications for leaders, combating false teaching, and maintaining sound doctrine.' },
      { id: 'q3_10', text: 'What does Paul mean by "sanctification" as discussed in epistles like Romans and 1 Thessalonians?', options: [{id:'a',text:'The act of God declaring a sinner righteous'}, {id:'b',text:'The lifelong process of being conformed to the image of Christ by the Holy Spirit'}, {id:'c',text:'The future removal of sin at Christ\'s return'}, {id:'d',text:'A special spiritual gift'}], correctOptionId: 'b', explanation: 'Sanctification is the ongoing work of the Holy Spirit in a believer\'s life, setting them apart for God\'s purposes and transforming them into Christ-likeness (Romans 6, 1 Thessalonians 4:3).' },
      { id: 'q3_11', text: 'In Galatians, Paul passionately defends the doctrine of justification by faith against whom?', options: [{id:'a',text:'Gnostic teachers'}, {id:'b',text:'Roman authorities'}, {id:'c',text:'Judaizers who insisted on circumcision for Gentile believers'}, {id:'d',text:'Antinomian libertines'}], correctOptionId: 'c', explanation: 'Paul wrote Galatians to counter the influence of Judaizers who were teaching that Gentile Christians must observe the Mosaic Law, particularly circumcision, in addition to faith in Christ for salvation.' },
      { id: 'q3_12', text: 'What is the "mystery" Paul frequently refers to, especially in Ephesians and Colossians?', options: [{id:'a',text:'The exact date of Christ\'s return'}, {id:'b',text:'The union of Jews and Gentiles in one body, the Church, through Christ'}, {id:'c',text:'The process of biblical inspiration'}, {id:'d',text:'The problem of evil'}], correctOptionId: 'b', explanation: 'The "mystery" often refers to God\'s previously hidden plan, now revealed in Christ, to unite both Jews and Gentiles into one new humanity, the Church (Ephesians 3:3-6, Colossians 1:26-27).' },
      { id: 'q3_13', text: 'Which Pauline epistle contains the "Armor of God" passage (Ephesians 6:10-18)?', options: [{id:'a',text:'Romans'}, {id:'b',text:'Philippians'}, {id:'c',text:'Ephesians'}, {id:'d',text:'Colossians'}], correctOptionId: 'c', explanation: 'Ephesians 6:10-18 describes the spiritual armor believers are to put on to stand against the schemes of the devil.' },
    ],
  }
];

const mockStudyTopics: StudyTopic[] = [
  {
    id: 'st1',
    title: 'The Attributes of God',
    description: 'A comprehensive study of God\'s character as revealed in Scripture, exploring His incommunicable and communicable attributes.',
    imageUrl: 'https://picsum.photos/seed/study1/400/250',
    contentSections: [
      { 
        id: 'st1_s1', 
        title: 'God\'s Omnipotence (All-Powerful)', 
        content: `
          <p>Omnipotence means God possesses all power and can do anything consistent with His holy character. It doesn't mean God can do what is logically impossible (like make a square circle) or act against His own nature (like sin or lie). His power is exercised in wisdom and love.</p>
          <p><strong>Key Verses:</strong></p>
          <ul>
            <li><strong>Jeremiah 32:17:</strong> "Ah, Lord GOD! It is you who have made the heavens and the earth by your great power and by your outstretched arm! Nothing is too hard for you."</li>
            <li><strong>Matthew 19:26:</strong> "But Jesus looked at them and said, 'With man this is impossible, but with God all things are possible.'"</li>
            <li><strong>Revelation 19:6:</strong> "Then I heard what seemed to be the voice of a great multitude, like the roar of many waters and like the sound of mighty peals of thunder, crying out, 'Hallelujah! For the Lord our God the Almighty reigns.'"</li>
          </ul>
          <p>Understanding God's omnipotence brings comfort and confidence. He is able to accomplish His purposes, protect His people, and ultimately triumph over all evil. It calls us to trust in His sovereign power rather than our own limited strength.</p>
        ` 
      },
      { 
        id: 'st1_s2', 
        title: 'God\'s Omniscience (All-Knowing)', 
        content: `
          <p>Omniscience means God knows all things – past, present, and future – including our thoughts, intentions, and the most minute details of creation. His knowledge is complete, perfect, and effortless. Nothing is hidden from Him, and He is never surprised.</p>
          <p><strong>Key Verses:</strong></p>
          <ul>
            <li><strong>Psalm 147:5:</strong> "Great is our Lord, and abundant in power; his understanding is beyond measure."</li>
            <li><strong>Hebrews 4:13:</strong> "And no creature is hidden from his sight, but all are naked and exposed to the eyes of him to whom we must give account."</li>
            <li><strong>1 John 3:20:</strong> "...for whenever our heart condemns us, God is greater than our heart, and he knows everything."</li>
            <li><strong>Isaiah 46:9-10:</strong> "...I am God, and there is no other; I am God, and there is none like me, declaring the end from the beginning and from ancient times things not yet done..."</li>
          </ul>
          <p>God's omniscience provides assurance that He understands our situations fully, even when we don't. It also brings accountability, as all our actions and thoughts are known to Him. This attribute works in harmony with His love and justice.</p>
        `
      },
      { 
        id: 'st1_s3', 
        title: 'God\'s Love and Grace', 
        content: `
          <p>God's love (agape) is a foundational aspect of His character. It is unconditional, sacrificial, and eternal. Grace is God's unmerited favor – His free gift of kindness and salvation to those who do not deserve it. Both love and grace are most clearly demonstrated in the sending of Jesus Christ.</p>
          <p><strong>Key Verses on Love:</strong></p>
          <ul>
            <li><strong>John 3:16:</strong> "For God so loved the world, that he gave his only Son, that whoever believes in him should not perish but have eternal life."</li>
            <li><strong>Romans 5:8:</strong> "But God shows his love for us in that while we were still sinners, Christ died for us."</li>
            <li><strong>1 John 4:8, 16:</strong> "Anyone who does not love does not know God, because God is love... So we have come to know and to believe the love that God has for us. God is love, and whoever abides in love abides in God, and God abides in him."</li>
          </ul>
          <p><strong>Key Verses on Grace:</strong></p>
          <ul>
            <li><strong>Ephesians 2:8-9:</strong> "For by grace you have been saved through faith. And this is not your own doing; it is the gift of God, not a result of works, so that no one may boast."</li>
            <li><strong>Titus 2:11:</strong> "For the grace of God has appeared, bringing salvation for all people."</li>
            <li><strong>2 Corinthians 12:9:</strong> "But he said to me, 'My grace is sufficient for you, for my power is made perfect in weakness.'"</li>
          </ul>
          <p>Understanding God's love and grace transforms our relationship with Him, freeing us from performance-based religion and assuring us of His constant care and provision for our salvation and daily lives.</p>
        `
      },
      { 
        id: 'st1_s4', 
        title: 'God\'s Holiness', 
        content: `
          <p>Holiness means God is utterly separate from sin and morally perfect. He is pure, righteous, and set apart in His majesty and character. His holiness is the standard for all moral goodness and the reason He cannot tolerate sin.</p>
          <p><strong>Key Verses:</strong></p>
          <ul>
            <li><strong>Isaiah 6:3:</strong> "And one called to another and said: 'Holy, holy, holy is the LORD of hosts; the whole earth is full of his glory!'"</li>
            <li><strong>1 Peter 1:15-16:</strong> "But as he who called you is holy, you also be holy in all your conduct, since it is written, 'You shall be holy, for I am holy.'"</li>
            <li><strong>Leviticus 19:2:</strong> "Speak to all the congregation of the people of Israel and say to them, You shall be holy, for I the LORD your God am holy."</li>
            <li><strong>Hebrews 12:14:</strong> "Strive for peace with everyone, and for the holiness without which no one will see the Lord."</li>
          </ul>
          <p>God's holiness is both awe-inspiring and convicting. It reveals our sinfulness and the need for a Savior. Through Christ, we are declared holy (positional sanctification) and are called to live holy lives (progressive sanctification), reflecting His character.</p>
        `
      },
    ],
  },
  {
    id: 'st2',
    title: 'The Sermon on the Mount',
    description: 'An in-depth look at Jesus\' foundational teachings in Matthew 5-7, outlining the ethics and character of Kingdom citizens.',
    imageUrl: 'https://picsum.photos/seed/study2/400/250',
    contentSections: [
      { 
        id: 'st2_s1', 
        title: 'The Beatitudes (Matthew 5:1-12)', 
        content: `
          <p>The Sermon on the Mount begins with the Beatitudes, a series of blessings that describe the character of those who belong to God's Kingdom. They are counter-cultural and portray an upside-down value system compared to the world.</p>
          <p><strong>Key Blessings:</strong></p>
          <ul>
            <li><strong>Poor in spirit:</strong> Those who recognize their spiritual bankruptcy before God.</li>
            <li><strong>Those who mourn:</strong> Those who grieve over sin – their own and the world's.</li>
            <li><strong>Meek:</strong> Those who are gentle and humble, submitting to God's will.</li>
            <li><strong>Hunger and thirst for righteousness:</strong> Those who passionately desire God's righteousness in their lives and the world.</li>
            <li><strong>Merciful:</strong> Those who show compassion and forgiveness to others.</li>
            <li><strong>Pure in heart:</strong> Those whose motives and inner life are aligned with God.</li>
            <li><strong>Peacemakers:</strong> Those who actively work to reconcile people to God and to one another.</li>
            <li><strong>Persecuted for righteousness' sake:</strong> Those who suffer for their allegiance to Christ.</li>
          </ul>
          <p>The Beatitudes are not commands to obey but descriptions of the character that God blesses and cultivates in His people through His grace. They challenge us to examine our hearts and priorities.</p>
        `
      },
      { 
        id: 'st2_s2', 
        title: 'Salt and Light (Matthew 5:13-16)', 
        content: `
          <p>Jesus uses two powerful metaphors to describe the influence of His followers in the world: salt and light. These images highlight the responsibility and impact of Kingdom citizens.</p>
          <p><strong>Salt of the Earth:</strong></p>
          <ul>
            <li>Salt was used as a preservative, preventing corruption. Believers are to have a preserving influence, hindering moral decay in society.</li>
            <li>Salt adds flavor. Christians should bring a distinct, positive quality to the world around them.</li>
            <li>Jesus warns against losing saltiness, becoming ineffective and useless.</li>
          </ul>
          <p><strong>Light of the World:</strong></p>
          <ul>
            <li>Light dispels darkness and reveals what is hidden. Believers are to shine the light of God's truth and goodness in a dark world.</li>
            <li>Light is meant to be seen. Jesus instructs His followers to let their light shine before others, so that they may see their good works and glorify God.</li>
            <li>Hiding one's light (like putting it under a basket) negates its purpose.</li>
          </ul>
          <p>These metaphors call believers to live distinct lives that positively impact society and draw attention not to themselves, but to God. It's a call to active, visible faith.</p>
        `
      },
      { 
        id: 'st2_s3', 
        title: 'Christ and the Law (Matthew 5:17-48)', 
        content: `
          <p>Jesus clarifies His relationship to the Old Testament Law. He did not come to abolish it but to fulfill it, bringing it to its intended meaning and purpose. He then demonstrates this by contrasting common interpretations of the Law with its deeper, heart-level demands.</p>
          <p><strong>Key Teachings:</strong></p>
          <ul>
            <li><strong>Fulfillment, not Abolition (5:17-20):</strong> Jesus affirms the Law's authority and permanence, but shows He is its ultimate fulfillment. He calls for a righteousness exceeding that of the scribes and Pharisees, which is an internal righteousness of the heart.</li>
            <li><strong>Anger and Murder (5:21-26):</strong> Jesus teaches that unrighteous anger and contemptuous words are as serious as murder in God's eyes, as they stem from the same root of hatred. He emphasizes reconciliation.</li>
            <li><strong>Lust and Adultery (5:27-30):</strong> Jesus internalizes the command against adultery, stating that lustful thoughts are a violation of its spirit. He calls for radical measures to deal with sin.</li>
            <li><strong>Divorce (5:31-32):</strong> Jesus restricts the grounds for divorce, highlighting God's original intent for the permanence of marriage.</li>
            <li><strong>Oaths (5:33-37):</strong> Jesus calls for simple truthfulness, where a "yes" means yes and a "no" means no, without the need for elaborate oaths.</li>
            <li><strong>Retaliation (5:38-42):</strong> Jesus overturns the "eye for an eye" principle for personal vengeance, calling for non-retaliation and generosity.</li>
            <li><strong>Love for Enemies (5:43-48):</strong> Jesus commands the radical love of enemies, reflecting the character of God who sends rain on the just and unjust. This is a hallmark of true children of God.</li>
          </ul>
          <p>Throughout this section, Jesus emphasizes that God is concerned not just with outward actions but with the inner attitudes and motives of the heart. He raises the standard of righteousness to a divine level, showing our need for His grace and transformation.</p>
        `
      },
      { 
        id: 'st2_s4', 
        title: 'True Righteousness: Giving, Praying, Fasting (Matthew 6:1-18)', 
        content: `
          <p>Jesus addresses three key religious practices: giving alms, praying, and fasting. He warns against performing these acts for public recognition and teaches the importance of sincere, God-focused motives.</p>
          <p><strong>Giving to the Needy (6:1-4):</strong></p>
          <ul>
            <li>The wrong way: Giving publicly to be seen and praised by others. Such people have already received their reward.</li>
            <li>The right way: Giving secretly, without drawing attention to oneself. God, who sees in secret, will reward this genuine charity.</li>
          </ul>
          <p><strong>Prayer (6:5-15):</strong></p>
          <ul>
            <li>The wrong way: Praying ostentatiously in public or using vain repetitions like pagans.</li>
            <li>The right way: Praying privately and sincerely to the Father. Jesus then provides a model prayer (The Lord's Prayer), emphasizing adoration, submission to God's will, dependence for provision, confession, and seeking deliverance. He also stresses the importance of forgiving others.</li>
          </ul>
          <p><strong>Fasting (6:16-18):</strong></p>
          <ul>
            <li>The wrong way: Fasting with a gloomy appearance to show others their piety.</li>
            <li>The right way: Fasting in a way that is not obvious to others, doing it for God alone.</li>
          </ul>
          <p>The underlying principle is that true piety is directed toward God, not for human applause. God values the secret devotion of the heart over outward displays designed to impress people.</p>
        `
      },
    ],
  },
  {
    id: 'st3',
    title: 'The Person and Work of the Holy Spirit',
    description: 'An exploration of the third person of the Trinity: His deity, personality, and His multifaceted ministry in the world and in the lives of believers.',
    imageUrl: 'https://picsum.photos/seed/study3/400/250',
    contentSections: [
      { 
        id: 'st3_s1', 
        title: 'The Deity and Personality of the Holy Spirit', 
        content: `
          <p>The Holy Spirit is not an impersonal force or influence, but a distinct divine Person, co-equal and co-eternal with God the Father and God the Son. Scripture attributes to Him divine titles, divine attributes, and divine works, and He possesses the characteristics of personality (intellect, emotion, will).</p>
          <p><strong>Evidence of Deity:</strong></p>
          <ul>
            <li><strong>Called God:</strong> Acts 5:3-4 (lying to the Holy Spirit is lying to God).</li>
            <li><strong>Possesses Divine Attributes:</strong> Omnipresence (Psalm 139:7-10), Omniscience (1 Corinthians 2:10-11), Omnipotence (Luke 1:35), Eternality (Hebrews 9:14).</li>
            <li><strong>Performs Divine Works:</strong> Creation (Genesis 1:2), Regeneration (John 3:5-8, Titus 3:5), Inspiration of Scripture (2 Peter 1:21).</li>
            <li><strong>Associated equally with Father and Son:</strong> Matthew 28:19 (Baptismal formula), 2 Corinthians 13:14 (Apostolic benediction).</li>
          </ul>
          <p><strong>Evidence of Personality:</strong></p>
          <ul>
            <li><strong>Intellect:</strong> He teaches, reminds, and guides into truth (John 14:26, 16:13); He has a mind (Romans 8:27); He searches the depths of God (1 Corinthians 2:10).</li>
            <li><strong>Emotion:</strong> He can be grieved (Ephesians 4:30); He loves (Romans 15:30 - implied through "love of the Spirit").</li>
            <li><strong>Will:</strong> He distributes spiritual gifts as He wills (1 Corinthians 12:11); He directs the activities of believers (Acts 16:6-7).</li>
            <li><strong>Performs Personal Actions:</strong> He speaks (Acts 13:2), testifies (John 15:26), intercedes (Romans 8:26), comforts (Acts 9:31).</li>
          </ul>
          <p>Understanding the Holy Spirit as a divine Person is crucial for a proper relationship with Him and for appreciating the fullness of His ministry.</p>
        `
      },
      { 
        id: 'st3_s2', 
        title: 'The Holy Spirit in the Old Testament', 
        content: `
          <p>While the outpouring of the Holy Spirit is a distinctive feature of the New Covenant age, the Spirit was active in the Old Testament period, though His ministry was often selective and sometimes temporary upon individuals.</p>
          <p><strong>Key Areas of Activity:</strong></p>
          <ul>
            <li><strong>Creation:</strong> The Spirit of God was involved in the creation of the universe (Genesis 1:2, Psalm 33:6, Job 26:13).</li>
            <li><strong>Empowering for Service:</strong>
              <ul>
                <li><strong>Leadership:</strong> Equipping leaders like Joseph (Genesis 41:38), Moses and the elders (Numbers 11:17, 25), Joshua (Numbers 27:18).</li>
                <li><strong>Judges:</strong> Empowering judges like Othniel (Judges 3:10), Gideon (Judges 6:34), Samson (Judges 14:6, 19).</li>
                <li><strong>Craftsmanship:</strong> Gifting artisans like Bezalel for constructing the tabernacle (Exodus 31:1-5).</li>
                <li><strong>Prophecy:</strong> Inspiring prophets to speak God's word (Numbers 24:2 - Balaam; 1 Samuel 10:10 - Saul; Ezekiel 2:2). David acknowledged the Spirit spoke through him (2 Samuel 23:2).</li>
              </ul>
            </li>
            <li><strong>Striving with Humanity:</strong> God's Spirit strove with mankind before the flood (Genesis 6:3).</li>
            <li><strong>Producing Moral and Spiritual Life (Individual):</strong> While not universal like in the New Covenant, there's evidence of the Spirit's internal work in individuals like David (Psalm 51:11 - "Take not your Holy Spirit from me").</li>
            <li><strong>Prophecies of Future Outpouring:</strong> The Old Testament looked forward to a time when the Spirit would be poured out more broadly on God's people (Isaiah 32:15, 44:3; Ezekiel 36:26-27, 39:29; Joel 2:28-29).</li>
          </ul>
          <p>The Old Testament lays the foundation for understanding the expanded and more personal ministry of the Holy Spirit in the New Covenant, particularly after Pentecost.</p>
        `
      },
      { 
        id: 'st3_s3', 
        title: 'The Work of the Holy Spirit in Salvation', 
        content: `
          <p>The Holy Spirit is indispensable in every aspect of a person's salvation, from initial conviction to final glorification. He applies the work of Christ to the believer's heart.</p>
          <p><strong>Key Aspects of His Salvific Work:</strong></p>
          <ul>
            <li><strong>Conviction of Sin (Pre-Conversion):</strong> The Spirit convicts the world of sin, righteousness, and judgment, drawing people to Christ (John 16:8-11). He opens hearts to receive the gospel (Acts 16:14 - Lydia).</li>
            <li><strong>Regeneration (New Birth):</strong> This is the Spirit's work of imparting new, spiritual life to a spiritually dead person (John 3:5-8; Titus 3:5). It's a radical transformation, making one a new creation (2 Corinthians 5:17).</li>
            <li><strong>Indwelling:</strong> At the moment of salvation, the Holy Spirit comes to live permanently within every believer (Romans 8:9; 1 Corinthians 3:16, 6:19; Galatians 4:6). This is a promise for all New Covenant believers.</li>
            <li><strong>Baptism with/in the Spirit:</strong> This refers to the Spirit's work of uniting the believer to Christ and incorporating them into the Body of Christ, the Church, at conversion (1 Corinthians 12:13; Galatians 3:27-28).</li>
            <li><strong>Sealing:</strong> The Holy Spirit is the seal of God upon believers, signifying ownership, security, and the guarantee of future redemption (Ephesians 1:13-14, 4:30; 2 Corinthians 1:22).</li>
            <li><strong>Assurance of Salvation:</strong> The Spirit bears witness with our spirit that we are children of God (Romans 8:16).</li>
            <li><strong>Sanctification:</strong> The ongoing process by which the Spirit sets believers apart for God and conforms them to the image of Christ (Romans 8:13; 2 Thessalonians 2:13; 1 Peter 1:2; Galatians 5:16-25 - Fruit of the Spirit).</li>
          </ul>
          <p>Without the Holy Spirit's active involvement, no one could come to faith, be born again, or grow in Christ-likeness. His work is essential for experiencing the fullness of God's salvation.</p>
        `
      },
    ],
  }
];

// Helper function to get user data from localStorage
const getUserData = (userId: string): UserData => {
  const rawData = localStorage.getItem(`${LOCAL_STORAGE_USER_DATA_KEY}_${userId}`);
  if (rawData) {
    try {
      return JSON.parse(rawData) as UserData;
    } catch (e) {
      console.error("Failed to parse user data:", e);
    }
  }
  // Default structure if no data or parse error
  return { quizProgress: {} };
};

// Helper function to save user data to localStorage
const saveUserData = (userId: string, data: UserData): void => {
  try {
    localStorage.setItem(`${LOCAL_STORAGE_USER_DATA_KEY}_${userId}`, JSON.stringify(data));
  } catch (e) {
    console.error("Failed to save user data:", e);
  }
};


// Public API for data service
export const getBlogPosts = async (): Promise<BlogPost[]> => {
  return new Promise(resolve => setTimeout(() => resolve([...mockBlogPosts]), 500));
};

export const getBlogPost = async (id: string): Promise<BlogPost | undefined> => {
  return new Promise(resolve => setTimeout(() => resolve(mockBlogPosts.find(post => post.id === id)), 300));
};

export const getQuizzes = async (): Promise<Quiz[]> => {
  return new Promise(resolve => setTimeout(() => resolve([...mockQuizzes]), 500));
};

export const getQuiz = async (id: string): Promise<Quiz | undefined> => {
  return new Promise(resolve => setTimeout(() => resolve(mockQuizzes.find(quiz => quiz.id === id)), 300));
};

export const getStudyTopics = async (): Promise<StudyTopic[]> => {
  return new Promise(resolve => setTimeout(() => resolve([...mockStudyTopics]), 500));
};

export const getStudyTopic = async (id: string): Promise<StudyTopic | undefined> => {
  return new Promise(resolve => setTimeout(() => resolve(mockStudyTopics.find(topic => topic.id === id)), 300));
};

// User Data specific services
export const getUserDataService = (userId: string): UserData => {
  return getUserData(userId);
};

export const updateUserQuizProgress = (userId: string, quizId: string, progress: Partial<UserQuizProgress>): void => {
  const userData = getUserData(userId);
  const existingProgress = userData.quizProgress[quizId] || { score: 0, completed: false, currentQuestionIndex: 0, answers: {} };
  userData.quizProgress[quizId] = { ...existingProgress, ...progress, timestamp: Date.now() };
  saveUserData(userId, userData);
};

export const getUserQuizProgress = (userId: string, quizId: string): UserQuizProgress | undefined => {
  const userData = getUserData(userId);
  return userData.quizProgress[quizId];
};

// Initializes user data if it doesn't exist. Called on login.
export const initializeUserData = (userId: string): void => {
  getUserData(userId); // This will create default if not exists
};
