"use client";

import React, { useState } from "react";
import {
  ArrowUpRight,
  Copy,
  X,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

/* ══════════════════════════════════════════════════
   GLOBAL CSS
   ══════════════════════════════════════════════════ */
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Inter:wght@300;400;500;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: #F9F9F9;
    --ink: #1E1A18;
    --rust: #C0350F;
    --mustard: #C8943A;
    --meadow: #6B7E5E;
    --forest: #2D4C39;
    --PuceRed: #642F37;
    --shadow-lift: 0 12px 48px rgba(30,26,24,.13);
  }

  html { scroll-behavior: smooth; }
  body { background: var(--bg); color: var(--ink); font-family: 'Inter', sans-serif; -webkit-font-smoothing: antialiased; }

  .nav { position: fixed; top: 0; left: 0; right: 0; z-index: 50; padding: 22px 44px; display: flex; justify-content: space-between; align-items: center; background: rgba(249,249,249,0.8); backdrop-filter: blur(10px); }
  .nav-name { font-family: 'Playfair Display', serif; font-weight: 700; font-size: 19px; color: var(--rust) }
  .nav-links { display: flex; gap: 32px; }
  .nav-links a { font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: .14em; text-decoration: none; color: #8fa398; transition: color 0.3s; }
  .nav-links a:hover { color:var(--rust); }

  .main-wall { padding: 140px 44px 60px; max-width: 1320px; margin: 0 auto; display: grid; grid-template-columns: 1.15fr .85fr; gap: 40px; }
  .zone-a h1 { font-family: 'Playfair Display', serif; font-size: clamp(40px, 5.2vw, 64px); line-height: 1.08; letter-spacing: -.02em; }
  .zone-a .tag { display: block; font-size: 10px; font-weight: 600; letter-spacing: .16em; text-transform: uppercase; color: var(--rust); margin-bottom: 20px; }
  
  .placard { background: #F9F9F9; padding: 32px; border-radius: 14px; box-shadow: 0 4px 24px rgba(0,0,0,0.04); border-top: 4px solid var(--rust); margin-top: 40px; }
  .principle { margin-bottom: 18px; }
  .principle strong { display: block; font-size: 11px; letter-spacing: 1px; text-transform: uppercase; color: var(--mustard); margin-bottom: 4px; }
  .principle p { font-size: 13px; color: #4A433D; line-height: 1.5; }

  .journal-section { padding: 40pxpx 44px; max-width: 900px; margin: 0 auto; }
  .journal-button { 
    width: 100%; 
    background: #FFF; 
    border: 1px solid #EAEAEA;
    border-radius: 15px; 
    padding: 30px 40px; 
    text-align: left; 
    cursor: pointer; 
    display: flex; 
    justify-content: space-between; 
    align-items: center;
    transition: all 0.3s ease;
    margin-bottom: 15px;
  }
  .journal-button:hover { border-color: var(--forest); box-shadow: 0 10px 30px rgba(45,76,57,0.08); }
  
  .journal-dropdown { 
    background: #FFF; 
    border-radius: 0 0 15px 15px; 
    padding: 0 60px 50px; 
    margin-top: -25px; 
    margin-bottom: 30px;
    border: 1px solid #EAEAEA;
    border-top: none;
  }

  .journal-meta { display: flex; gap: 20px; font-size: 11px; font-weight: 600; color: var(--mustard); text-transform: uppercase; margin-bottom: 10px; }
  .journal-title { font-family: 'Playfair Display', serif; font-size: 24px; color: var(--forest); line-height: 1.2; }
  .journal-body { font-size: 16px; line-height: 1.9; color: #333; padding-top: 30px; border-top: 1px solid #F0F0F0; }
  .journal-body p { margin-bottom: 24px; }
  .dropcap { float: left; font-family: 'Playfair Display', serif; font-size: 70px; line-height: 1; font-weight: 700; padding-right: 12px; color: var(--forest); }

  .india-meta { display: flex; gap: 20px; font-size: 11px; font-weight: 600; color: var(--mustard); /* Using your Electric Blue */text-transform: uppercase; margin-bottom: 10px; }
  .india-title { font-family: 'Playfair Display', serif; font-size: 24px; color:var(--PuceRed)!important;line-height: 1.2;}
  .dropcap-india { float: left; font-family: 'Playfair Display', serif;  font-size: 70px;  line-height: 1; font-weight: 700; padding-right: 12px; <color:var(--PuceRed); }

  .timeline { max-width: 800px; margin: 60px auto; padding: 0 44px; }
  .tl-item { margin-bottom: 48px; border-left: 2px solid var(--rust); padding-left: 24px; position: relative; }
  .tl-item::before { content: ''; position: absolute; left: -7px; top: 0; width: 12px; height: 12px; border-radius: 50%; background: var(--rust); }
  .side-quest { margin-top: 15px; font-style: italic; font-size: 13px; color: var(--meadow); display: block; border-left: 2px solid #EEE; padding-left: 15px; line-height: 1.5; }

  .gallery-wall {
    padding: 80px 44px;
    max-width: 1400px;
    margin: 0 auto;
    column-count: 4;
    column-gap: 20px;
  }

  .gallery-card {
    display: inline-block;
    width: 100%;
    margin-bottom: 20px;
    background: #fff;
    padding: 10px;
    border-radius: 4px;
    box-shadow: 0 4px 15px rgba(0,0,0,0.05);
    transition: transform 0.3s ease;
  }

  .gallery-card img {
    width: 100%;
    height: auto;
    display: block;
    border-radius: 2px;
  }

  .cta-ticket { position: fixed; bottom: 28px; right: 28px; z-index: 60; background: var(--rust); color: #fff; border: none; border-radius: 12px; display: flex; cursor: pointer; box-shadow: 0 6px 28px rgba(192,53,15,.3); overflow: hidden; }
  .modal-back { position: fixed; inset: 0; z-index: 100; background: rgba(30,26,24,.4); backdrop-filter: blur(6px); display: flex; align-items: center; justify-content: center; }
  .modal-card { background: #fff; padding: 32px; border-radius: 20px; width: 100%; max-width: 400px; position: relative; }

  @media (max-width: 1100px) { .gallery-wall { column-count: 3; } }
  @media (max-width: 850px) { 
    .main-wall { grid-template-columns: 1fr; } 
    .journal-button { padding: 20px; }
    .journal-dropdown { padding: 0 25px 30px; }
  }
  @media (max-width: 800px) { .gallery-wall { column-count: 2; } }
  @media (max-width: 500px) { .gallery-wall { column-count: 1; } }
`;

function Modal({ onClose }: { onClose: () => void }) {
  const [toast, setToast] = useState<string | null>(null);
  const copy = (v: string) => {
    navigator.clipboard.writeText(v).then(() => {
      setToast("Copied!");
      setTimeout(() => setToast(null), 1500);
    });
  };

  return (
    <div className="modal-back" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: 20,
            right: 20,
            border: "none",
            background: "none",
            cursor: "pointer",
          }}
        >
          <X size={20} />
        </button>
        <h3
          style={{
            fontFamily: "Playfair Display",
            fontSize: 24,
            marginBottom: 20,
          }}
        >
          Contact
        </h3>
        <div
          style={{
            background: "#F9F9F9",
            padding: 16,
            borderRadius: 12,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span>mapazgalarragaj@icloud.com</span>
          <button
            onClick={() => copy("mapazgalarragaj@icloud.com")}
            style={{ border: "none", background: "none", cursor: "pointer" }}
          >
            <Copy size={16} />
          </button>
        </div>
        {toast && (
          <p
            style={{
              textAlign: "center",
              marginTop: 10,
              fontSize: 12,
              color: "var(--rust)",
            }}
          >
            {toast}
          </p>
        )}
      </div>
    </div>
  );
}

export default function Portfolio() {
  const [modal, setModal] = useState(false);
  const [openJournal, setOpenJournal] = useState<string | null>(null);

  const toggleJournal = (id: string) => {
    setOpenJournal(openJournal === id ? null : id);
  };

  return (
    <>
      <style>{CSS}</style>
      <nav className="nav">
        <span className="nav-name">Ma. Paz Galarraga J.</span>
        <div className="nav-links">
          <a href="#journal">Journal</a>
          <a href="#gallery">Gallery</a> {/* Added this line */}
          <a href="#resume">Timeline</a>
        </div>
      </nav>
      <main className="main-wall">
        <div className="zone-a">
          <span className="tag">
            Global Development · Strategy · Entrepreneurship
          </span>
          <h1>
            Curiosity has always
            <br />
            been my starting point.
          </h1>
          <p
            style={{
              marginTop: 22,
              fontSize: 15,
              lineHeight: 1.6,
              color: "#4A433D",
              maxWidth: 480,
            }}
          >
            A global development and strategy profile by lived experience across
            Latin America, Europe, and Asia, translating complexity into
            structured, sustainable action.
          </p>

          <div className="placard">
            <h3 style={{ fontFamily: "Playfair Display", marginBottom: 20 }}>
              The Principles I Work By
            </h3>
            <div className="principle">
              <strong>Roots</strong>
              <p>
                Build depth and connection. Trust, structure, and consistency
                are what allow people to grow without losing direction.
              </p>
            </div>
            <div className="principle">
              <strong>Adventure</strong>
              <p>
                Curiosity over comfort. Embrace change with curiosity, seeing
                challenge as an invitation to grow and transform.
              </p>
            </div>
            <div className="principle">
              <strong>Sustainability</strong>
              <p>
                Building beyond the short term. I aim to create things that
                last, designed with purpose beyond the short term.
              </p>
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 40,
            alignItems: "center",
          }}
        >
          <div
            style={{
              background: "#FFF",
              padding: "12px",
              borderRadius: "15px",
              boxShadow: "var(--shadow-lift)",
              transform: "rotate(1deg)",
              width: "80%",
            }}
          >
            <img
              src="/Profile3.jpg"
              alt="Ma. Paz"
              style={{
                width: "100%",
                aspectRatio: "3/4",
                borderRadius: "10px",
                objectFit: "cover",
                display: "block",
              }}
            />
          </div>
          <blockquote
            style={{
              fontFamily: "Playfair Display",
              fontStyle: "italic",
              fontSize: 32,
              paddingLeft: 20,
              borderLeft: "3px solid var(--rust)",
              lineHeight: 1.3,
              width: "80%",
            }}
          >
            <p>&quot;I am air, and trust are my roots&quot;</p>
          </blockquote>
        </div>
      </main>
      <section className="journal-section" id="journal">
        <h2
          style={{
            fontFamily: "Playfair Display",
            fontSize: 32,
            marginBottom: 40,
            color: "var(--forest)",
          }}
        >
          The Chinese Diaries
        </h2>

        {/* JOURNAL 1 - BEIJING */}
        <button
          className="journal-button"
          onClick={() => toggleJournal("china1")}
        >
          <div>
            <div className="journal-meta">
              <span>Beijing, China</span>
              <span>2023</span>
            </div>
            <h3 className="journal-title">
              1. From Traditional Art to Sustainable Development
            </h3>
          </div>
          {openJournal === "china1" ? (
            <ChevronUp color="#2D4C39" />
          ) : (
            <ChevronDown color="#2D4C39" />
          )}
        </button>

        {openJournal === "china1" && (
          <div className="journal-dropdown">
            <div className="journal-body">
              <p>
                <span className="dropcap">T</span>he first thing my close
                friends started asking me a few weeks after arriving in Beijing
                was: What is your favorite thing about China? Among many of my
                favorite things, my love-hate relationship with the city&apos;s
                landscape stands out.
                <img
                  src="/BeijingJournal.jpg"
                  alt="Beijing"
                  style={{
                    width: "45%",
                    float: "right",
                    marginLeft: "25px",
                    marginBottom: "15px",
                    borderRadius: "12px",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                  }}
                />
                When I come to a new city/country, I imagine that I bring a huge
                imaginary white canvas, where everything I see, hear, and taste
                will then be turned into drawings on this page. As I get the
                chance to explore Beijing, my &lsquo;painting&rsquo; keeps drawing from the
                grey, pale yellow, and dirty orange block buildings, long
                never-ending highways - filled with black cars - and red, blue,
                and green traditional Chinese buildings.
              </p>

              <p>
                These roads create an incomprehensible knot around the paper,
                where, somehow, the thousands of tiny people biking up and down
                the city find their way out. Between here and there, some trees,
                rivers, and gardens are drawn; towards the top of the page, a
                grayish-blue sky is perceived, allowing some blank space for the
                eye to escape from the chaos of objects. If you look closely at
                the painting, there are main highways that guide the eyes away
                from the density of the city into the calmness of the mountains.
              </p>

              <p>
                The silhouette of a tall mountain range filled with green leaves
                covering the historic trail of the Great Wall allows the viewer
                to imagine the possibilities of a nation without the noise of
                life. Despite the chaotic composition of my painting, a certain
                harmonious feeling emits from the page. It is obvious that the
                focus of the painting is human life and its many variables;
                however, the viewer still finds spaces where the chaos
                disappears, and space for thought begins.
              </p>

              <p>
                While it is true that China is an immense country and holds many
                cities with different infrastructure distributions within its
                borders, as well as many different ways of life, I take my
                painting as a reference for a somewhat &quot;normal&quot; life. Having had
                the opportunity to visit the National Art Museum, I make a few
                reflections on how the path has driven society to what it is
                today and how we look at sustainable development toward the
                future.
              </p>

              <p>
                The two museum rooms exhibited the ideal lifestyle of ancient
                Chinese life and culture, portraying, above all, the idea of
                living a harmonious and balanced life. Most of the art&apos;s
                composition showed tall mountains, vast lakes, and valleys,
                occupied by small houses and tiny people. Elements such as
                moving lines and faded ink colors depict how these individuals
                integrate into the environment and not the environment
                integrated into the individual&apos;s lifestyle.
              </p>

              <p>
                The ink paintings showed a way of living where human activity
                was one of many elements of a balanced life. As expressed by
                Taoism, the &quote;path&quot; is one that aspires to harmonize where
                virtues such as humility, simplicity, and full physical and
                spiritual well-being are achieved. Sustainability, as
                exemplified by Taoism, entails seeking a balance within society
                and with the Earth, aligning with the principles of the
                Sustainable Development Goals.
              </p>

              <p>
                Today, the focus of the painting has shifted. We no longer see
                earth, water, and air as the biggest elements but instead,
                society and people as a collective. For many years, development
                has been a synonym for growth. Today, it is exemplified in the
                rise of infrastructure, the increase in agriculture, the process
                of deforestation, in a few words, the rise of economic wealth
                dependent on the exploitation of our resources.
              </p>

              <p>
                Given the rise of urban society, social dynamics have also
                shifted from the path of simplicity and humility expressed by
                Taoism to a constant pursuit for more. Caring for the
                environment around us has gotten lost along the way, and
                although the balance of life is still perceived in my painting,
                there are many areas lacking still to be developed.
              </p>

              <p>
                I raise the question: What is our goal? Development, as we know
                it, has taken the painting from a traditional Chinese ink piece
                to a chaotic canvas full of man-made objects. Sustainable
                development seems to suggest that we&apos;ve lost track, and in order
                to achieve the 17 goals set, a retrospective analysis should be
                made.
              </p>

              <p>
                In areas concerning the environment, we must think about how to
                come back to the ideal life lived by the tiny men of traditional
                Chinese ink artwork. As I compare the traditional painting
                themes to my artwork, I reflect on how, although balance is an
                undeniable element, the properties that make up such harmony
                today are not and will not be sustainable in the long run if we
                do not turn back to the roots of our growth and reflect on how
                to protect it.
              </p>
            </div>
          </div>
        )}

        {/* JOURNAL 2 - SHANGHAI */}
        <button
          className="journal-button"
          onClick={() => toggleJournal("china2")}
        >
          <div>
            <div className="journal-meta">
              <span>Shanghai, China</span>
              <span>2024</span>
            </div>
            <h3 className="journal-title">2. A Stroll Through Shanghai</h3>
          </div>
          {openJournal === "china2" ? (
            <ChevronUp color="#2D4C39" />
          ) : (
            <ChevronDown color="#2D4C39" />
          )}
        </button>

        {openJournal === "china2" && (
          <div className="journal-dropdown">
            <div className="journal-body">
              <p>
                <span className="dropcap">I</span>t wasn&apos;t until I arrived at
                the train station that I realized I had forgotten my passport.
                With 30 seconds to think, I handed my bag to Tom and took the
                metro back home. Time passed slowly, as if mocking me, testing
                my patience and reminding me of my mistake. But if it wasn’t for
                times patience, I would&apos;ve missed my train.
                <img
                  src="/ShanghaiJournal.JPG"
                  alt="Shanghai"
                  style={{
                    width: "45%",
                    float: "left",
                    marginRight: "25px",
                    marginBottom: "15px",
                    borderRadius: "12px",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                  }}
                />
              </p>

              <p>
                Successfully back with 10 minutes to spare, I boarded the train
                to Shanghai. A bullet train, racing at 276 km/hour, transported
                us into the city. With no expectations in mind, we left the
                train station and took a taxi to the hotel. As the car drove
                into the city, skyscrapers adorned in lights rose around us,
                announcing our arrival. A city like no other stood before me,
                making three days enough to fall in love with China all over
                again. A country harmonizing both the future and the past,
                allowing technology meet tradition and tradition to shape the
                future.
              </p>

              <p>
                Riding the train back home, some thoughts filled my mind.
                Firstly, I couldn&apos;t help but give Shanghai a color, as I do for
                every city I visit. Different from most cities, such as Rome,
                that has an analogue palette of warm colors or Beijing, which is
                characterized by a scale of grey, blue, and white, Shanghai is a
                city covered in complementary colors. Opposites on the color
                circle yet building a unique harmony of its own, exemplifying
                the brightness of innovation while allowing reality to catch up
                at its own pace.
              </p>

              <p>
                It is a city where colors ranging from red, and pink stand out
                because of their contrast to metallic green. It is a city where
                yellow meets purple and blue meets orange, a city where gray is
                covered up by the enchantment of colors hiding underneath one&apos;s
                gazing range, the reality of a city that holds both the future
                and past.
              </p>

              <p>
                The ironic contrast between a utopic futuristic feeling and its
                despotic reality is my second major takeaway. Walking across the
                streets, a sense of being in one&apos;s own childhood dreams fills up
                the air. It is a city that allows one to believe flying cars,
                extraterrestrial life and time traveling exists. While observing
                its tall skyscrapers in the Pudong area and the uniqueness of
                the TV tower observed from across the Huangpu River a sense of
                admiration settles. The river being the meeting point of two
                dimensions, where the rest of the world meets the future, as if
                there was a transparent veil separating them and us.
              </p>

              <p>
                Towards our backs, architecture takes us back to Europe as its
                un-missable style decorates the streets of the Bund. Yet the
                best part comes when one walks out the path of a tourist and
                down the street of a local. Suddenly, the bright colors, shiny
                stores, and shopping centers fade away, and that which was
                hidden underneath the awe of development suddenly pops up.
              </p>

              <p>
                One finds itself looking at homes covered in dirty paint, broken
                metals, hanging clothes and old AC machines. Street food odors
                cover the air as one walks past small shops, working women,
                smoking men, and stray cats. The reality of a city that seemed
                perfect at first glance now makes it feel real.
              </p>

              <p>
                While riding the train back to Beijing, I understood that there
                will never be a utopia without the dystopic sweat of
                hard-working people. Shanghai, being a city of opportunities not
                only for the Chinese but for the world. As this city draws the
                line between now and then, setting the point where China meets
                the world and welcoming everyone to believe in the dream of a
                future, where flying cars don&apos;t feel out of place.
              </p>
            </div>
          </div>
        )}

        {/* JOURNAL 3 - CHONGQING */}
        <button
          className="journal-button"
          onClick={() => toggleJournal("china3")}
        >
          <div>
            <div className="journal-meta">
              <span>Chongqing, China</span>
              <span>2024</span>
            </div>
            <h3 className="journal-title">3. The Megacity of Chongqing</h3>
          </div>
          {openJournal === "china3" ? (
            <ChevronUp color="#2D4C39" />
          ) : (
            <ChevronDown color="#2D4C39" />
          )}
        </button>

        {openJournal === "china3" && (
          <div className="journal-dropdown">
            <div className="journal-body">
              <p>
                <span className="dropcap">3</span>3 million people piled up in a
                city with an area of only 82,239 km². &quot;Piled up&quot; seemed like the
                way to describe what I thought life would be like in the
                second-largest populated city in the world. Yet, to my surprise,
                this was not the feeling I got when touring the streets of
                Chongqing.
                <img
                  src="/ChongqingJournal.jpg"
                  alt="Chongqing"
                  style={{
                    width: "45%",
                    float: "right",
                    marginLeft: "25px",
                    marginBottom: "15px",
                    borderRadius: "12px",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                  }}
                />
              </p>

              <p>
                Since our arrival in the metropolis, the thought of being
                surrounded by crowds of people at all moments scared me. As soon
                as we took the MetroLine towards our hotel, we realized that it
                was a city covered in an extensive spider web of metro lines
                crossing from side to side, spreading throughout the city. Out
                the window, thousands of skyscrapers rose 150 meters above our
                site level, drawing our attention to the sky where clouds
                covered the stars. Below the metro line, a labyrinth of roads
                drove thousands of cars towards their destinations, and despite
                the many signs suggesting millions of people leave here, the
                roads weren&apos;t congested, the streets weren&apos;t crowded, and the
                metro was not full.
              </p>

              <p>
                Three days was enough to learn the particularities of such an
                immense city. Given that it is built on the side of mountains,
                metro lines do not follow the commonality of being an
                underground form of transportation. In fact, it is a city where
                most of its metro lines cross above site level. The problem of
                how to make it fit between high skyscrapers makes it a
                challenging problem to solve for Chinese engineering. However,
                genius solutions such as crossing the metro through buildings
                came around in time to provide quality transportation to its
                citizens.
              </p>

              <p>
                High buildings rise at all levels from the riverside up to the
                mountain, making it a never-ending vertical city, where what
                seems to be the ground floor from where you are standing is, in
                fact, the 22nd floor of the building that rises from a different
                ground level. Walking around the city feels like playing the
                &quot;snake and the ladder&quot; board game one used to play as a child.
                You might fall on the snake, sliding down closer to the finish
                line, but if unlucky, the ladder will bring you back up again.
                Just like that, one could reach the riverside as easily as
                walking back up to the temples at the hillside of the mountains.
              </p>

              <p>
                Unlike other cities around the country, the two main rivers meet
                noticeably divided by their characteristic colors, right in
                front of the opera house. The Jialing meets the Yangtze River,
                making this the city of the &quot;two rivers and four banks&quot;, where
                clear waters meet the famous Yellow River. The urban design aims
                to bring life to the riverfront while working alongside a
                conscious and climate-adapted resilient city objective.
              </p>

              <p>
                The booming megacity holds more in it than what is perceived
                through our eyes; its history dates back to the Yuan Dynasty in
                1189 BC, becoming thereafter the capital of the kingdom of
                Daliang. By 1891, it became a crucial economic center as the
                first inland port for trade outside China. Today, it still
                stands as one of the most important economic engines of Western
                China, having a diversified economy ranging from industries such
                as processed food to automobile manufacturing.
              </p>

              <p>
                The fast-paced growth of the population as well as its economic
                relevance is due to its strategic geographical location between
                the large rivers. As I reflect on my time exploring its
                labyrinthine streets and breathtaking high-rise buildings, I am
                reminded that Chongqing is more than just a megacity; it is a
                symbol of progress and innovation. Its strategic location and
                forward-thinking approach to development inspire the future of
                urban centers around the world.
              </p>

              <p>
                It is unimaginable for many to live in a city with 33 million
                people, yet somehow, while wandering around the city of spice,
                crowds were never a problem but rather, how to say &apos;not spicy,
                please&apos; for our next noodle meal.
              </p>
            </div>
          </div>
        )}
      </section>
      <section className="journal-section" id="india-journal">
        <h2
          style={{
            fontFamily: "Playfair Display",
            fontSize: 32,
            marginBottom: 40,
            color: "var(--PuceRed)",
          }}
        >
          The India Chronicles
        </h2>

        {/* INDIA ENTRY 1 */}
        <button
          className="journal-button"
          onClick={() => toggleJournal("india1")}
        >
          <div>
            <div className="india-meta">
              <span>Lucknow, India</span>
              <span>2025</span>
            </div>
            <h3 className="india-title">1. The Search for Adventure</h3>
          </div>
          {openJournal === "india1" ? (
            <ChevronUp color="var(--PuceRed)" />
          ) : (
            <ChevronDown color="var(--PuceRed)" />
          )}
        </button>

        {openJournal === "india1" && (
          <div className="journal-dropdown">
            <div className="journal-body">
              <p>
                <span className="dropcap-india">I</span>t’s funny what life
                teaches us. I came to India in search of my next big adventure,
                and instead I was reminded of what I already had, what I had
                lost, and what I truly wanted.
              </p>

              <p>Dubai Airport – 05/09/2025:</p>

              <p>
                Upon arriving in Dubai, I made my way to the terminal for my
                flight to India. It wasn&apos;t Emirates, but a low-cost airline. To
                get there, I had to walk for fifteen minutes and then take a bus
                for another fifteen.
              </p>

              <p>
                Mental note: in Dubai, always leave a couple of extra hours,
                otherwise, you won’t make your connection.
              </p>

              <p>
                The terminal was small, the kind of small you expect in a
                regional airport rather than one of the world&apos;s busiest transit
                hubs. Seven waiting areas, a McDonald&apos;s, a Subway, a smoking
                room, a praying room, a single women bathroom, and around six
                hundred people. It wasn&apos;t hard to notice the imbalance. Maybe
                I&apos;m exaggerating; and no, I didn&apos;t count, but there were far
                more men than women.
              </p>

              <p>
                While waiting for my order, my phone charging besides me, I sat
                there observing the night travelers. There is a clear
                demographic distinction between those flying with Wizz Air to
                Budapest and the rest of us heading to the other side of the
                globe: India, Pakistan, Nepal.
              </p>

              <p>
                My mind drifts, filling with questions: Why was I on this
                flight? What was waiting for me in India? Was I making the right
                choice? Will I be able to make friends?
              </p>
              <p>
                I ate my burger and killed a couple of hours on my phone, mostly
                reassuring my family that I&apos;m okay and catching up with friends.
                When it&apos;s was time to board the plane, I finally see who is
                travelling with me. On the bus to the plane, I realize that out
                of two hundred seats, there are six women. Five traveling with
                their families, and me. And yes, this time I did count.
              </p>

              <p>
                When I reached my seat, someone was already sitting in it. He
                looks at me, unbothered as if waiting for me to say something.
                For a second, I hesitate thinking I was wrong, I double check
                and then I do. I tell him it’s my seat. He stands up without
                protest, moves away, and I sit. No words exchanged, no apology.
                Just an understanding that space, here, has to be claimed.
              </p>

              <p>
                Around me, people are still arguing over overhead compartment,
                voices rising, arms reaching, bags being forced into places they
                don&apos;t fit. The plane hasn&apos;t taken off yet, and already there is
                stress. I fast my seatbelt and look straight ahead. The cultural
                shock had already begun.
              </p>

              <p>
                Shortly after, I fell sleep. I had been traveling for days,
                Istanbul to Budapest, a ten-hour bus to Venice, a four-hour
                train to Rome, one last night with my boyfriend, and then an
                eleven hour trip to India. Staying awake felt impossible. They
                offered food, but nothing appealed to me. I just wanted to rest.
              </p>

              <p>
                My body shut down before my thoughts did. What if don’t like it?
                What if I don&apos;t make friends? What if I don’t adapt? With those
                same thoughts weighing on my mind, I woke up as we landed. It
                was only 5:45 a.m., and a long day lay ahead.
              </p>

              <p>
                With that same fighting spirit, people stood up and prepared to
                get off the plane. I wasn&apos;t in a rush, but I realized that if I
                waited my turn, it might never come. So as soon as I spotted a
                little space in the aisle, I claimed it, got my bags ready, and
                walked towards immigration.
              </p>

              <p>
                A new challenge for a new day. I waited patiently in line until
                it’s my turn. As usual, I put on a smile and greet the officer
                with a quiet good morning. He takes my passport, looks at it
                with visible confusion, flips through the pages, and scans it.
                &quot;Where are you from?&quot; He askes.
              </p>

              <p>&quot;Ecuador&quot;.</p>

              <p>
                His expression shifts. I get the sense he doesn&apos;t know where
                that is. As he reads through my visa, his face grows more
                confused. He flips back and forth between pages, scanning,
                reading. Then he looks up: &quot;Why are you in Lucknow&quot;.
              </p>

              <p>&quot;for studies&quot; I answer, confident, almost cheerful.</p>

              <p>
                He continues reading. Again and again. He doesn&apos;t understand why
                my passport is Ecuadorian but my visa was issued by the Indian
                embassy in Colombian. I explained three times that there is no
                Indian embassy in Ecuador, and that the embassy in Bogota serves
                for both countries.
              </p>

              <p>
                He stares at me, unconvinced. Then he calls his colleague. Now
                there are two of them, both confused, reading and rereading my
                visa, discussing something in Hindi, glancing at me from time to
                time. I smile. After what feels like an hour, he takes a deep
                breath and stamp my passport. &quot;Welcome to India&quot; he says.
              </p>

              <p>
                As I walk out, I order an Uber and head toward the university.
                The taxi leaves the airport highway and enters the city, I stare
                through the window. I can&apos;t belief I am in India. As we get
                closer, the sound of honking rises and the traffic thickens.
                It&apos;s already 7:00 a.m., and life is starting in Lucknow.
              </p>

              <p>
                We drive through the center, past the markets, through crowds,
                past some cows, and onto the highway. The city blurs past the
                window, unfished buildings, dust rising from the road, colors I
                don&apos;t yet know how to read. By the time we arrive, the heat was
                unbearable. Everything bothered me: the heat, the dust, the
                hunger, the exhaustion. My clothes stick to my skin, thinning my
                patience.
              </p>

              <p>
                I drop my bags, take a quick shower, and lie down for a moment.
                Not long enough to rest, just long enough to breathe. Then I
                step back outside and walk straight to the cafeteria in search
                of food. I don&apos;t know how things work here, where to stand, what
                to take, how to pay, but I trust that if I smile someone will
                reach out and explain.
              </p>

              <p>
                Breakfast is simple: peanut butter and jam, a few slices of
                toast, a banana, and coffee. As I look for a place to sit, a
                girl looks at me. I answer with a friendly smile and walk
                towards her. She makes space for me and we start talking.
              </p>

              <p>
                She asks what I&apos;m doing here, why I chose India for my exchange
                semester, how I&aposm finding it so far. She explains that the
                canteen is covered by our school fees and that we can take
                whatever we want. It&apos;s open for breakfast, lunch, a snack around
                4:00 p.m., and dinner. Practical information quietly reassuring.
              </p>

              <p>
                She gives me her number and invites me to have dinner with her
                and her friends that night. They come from different parts of
                India and they have all met here in university. She tells me
                they will be very excited to meet me so to make sure not to miss
                out on this dinner.
              </p>

              <p>
                As she walks away to her morning class, I feel lucky. The fear
                that had been gripping begins to loosen. The anxiety fades and I
                take a deep breath. I leave the canteen relieved and excited. I
                had just met someone.
              </p>

              <p>
                That night, I join them for dinner. Two of the guys are from
                Delhi, one from Mumbai, and the girls come from other cities
                across India. Places whose names I can barely pronounce. They
                are welcoming, curious and easy to be around.
              </p>

              <p>
                They listen as I tell my story, leaning in, asking questions.
                Where am I from? Why did I choose India? How did I end up at
                this university, sitting with them around this table? Their
                curiosity feels genuine, almost generous. These where the same
                questions I asked myself while on the plane and here I am
                answering them for someone else to understand.
              </p>

              <p>
                They speak about their cities with pride, about a country too
                large to understand at once. They teach me how flavors change
                from place to place, how food carries geography. What to eat in
                Delhi, What to try in Mumbai, which dishes belong to the south,
                which to the north.
              </p>

              <p>
                I sit there quietly, taking it all in. Just hours earlier, I had
                felt completely alone. Now I’m surrounded by strangers who
                already feel familiar. For the first time since arriving, India
                feels less overwhelming and a little more like a new beginning.
              </p>

              <p>
                That first night, I lay in bed, excited to what was to come.
                Sleep arrived quickly. My body collapsed at 10:00 P.m. and
                recovered only twelve hours later.
              </p>
            </div>
          </div>
        )}
        {/* CHAPTER 2 */}
        <button
          className="journal-button"
          onClick={() => toggleJournal("india2")}
        >
          <div>
            <div className="india-meta">
              <span>Lucknow, India</span>
              <span>2025</span>
            </div>
            <h3 className="india-title">2. Week 1: Snap out of pilot mode</h3>
          </div>
          {openJournal === "india2" ? (
            <ChevronUp color="#032C7D" />
          ) : (
            <ChevronDown color="#032C7D" />
          )}
        </button>

        {openJournal === "india2" && (
          <div className="journal-dropdown">
            <div className="journal-body">
              <p>
                <span className="dropcap-india">T</span>he IIM campus is larger
                than what I had imagined. It has sixteen hostel buildings where
                all students live, faculty housing spread to the west of the
                campus, and at its center the classrooms, the canteen, and the
                football field. If you cross the field, you&apos;ll find the
                basketball courts, the tennis court, and what might be an old
                volleyball court. Taking the street to the left leads to the
                hospital, a large building that serves as the workplace for one
                nurse and the school’s general doctor.
                <img
                  src="IndiaJournal2.jpg"
                  alt="IIM Lucknow Campus"
                  style={{
                    width: "45%",
                    float: "left",
                    marginRight: "25px",
                    marginBottom: "15px",
                    borderRadius: "12px",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                  }}
                />
              </p>

              <p>
                Since the campus became home to nearly five hundred students
                each year, it also has a bank, a pharmacy, and a small market
                store where you can find everything from badminton rackets to
                mukhwas. Although India today runs on apps that deliver food to
                your door in minutes, the school has a student-run restaurant
                and two small street-food-style spots along the side of the
                canteen. Whenever daal and chapati became too much, you could
                find Chinese noodles or fried chicken burgers instead.
              </p>

              <p>
                Despite its size, the campus was full of life. Students biked
                from one side to the other, dogs followed you around hoping for
                scratches, and gardeners moved quietly through the green areas,
                picking up twigs and leaves from the ground. Day to day life
                went on at IIM lucknow. Our building was called Aryabhata, named
                after a pioneering Indian mathematician and astronomer.
                Something I learned only after a while to be honest.
              </p>

              <p>
                Aryabhata housed the exchange students on the third floor, while
                the second floor filled up with participants from special
                management programs that came and went throughout the year.
                Altogether, the campus covered about three square kilometers and
                hosted the best 2.07% of students in India. Certainly a number
                that made you feel special to be part of.
              </p>

              <p>
                <strong>07/09/2025</strong>
                <br />
                Room 303 was the first to light up that night. Standing in front
                of the door, it felt like a new empty room for a new empty
                beginning. The kind of feeling you get from a blank Word page
                before starting a school essay, or a blank canvas before the
                first stroke of paint. There were no sheets, no soap, no toilet
                paper, no hot water, and my AC was broken.
              </p>

              <p>
                The heat had made the air feel heavy as I unpacked by bags,
                sorting my cloths into a closet that had been empty for a while.
                I folded my t-shirt, my pants, my jumpers and my jackets. I
                organized my shoes, my books and my cameras. I made sure my room
                felt a tiny bit less empty, and a little more like home. After
                all, this was going to be my bedroom for the next few months.
              </p>

              <p>
                That night at dinner, the girls told me to use Blinkit, an app
                that delivers almost anything to your doorstep within ten
                minutes. It was a good thing I remembered the name, because
                later that night I ordered the basics: toilet paper, hand soap,
                shampoo, laundry detergent, and a few snacks that looked
                interesting enough to try. Unexpectedly, the delivery arrived
                within ten minutes.
              </p>

              <p>
                I knew that was the promise, the whole point of the app, yet for
                some reason I hadn&apos;t fully believed it. I think part of me still
                carried those tired clichés about India. Chaos over efficiency,
                delays over precision, things working eventually but not on
                time. However the driver arrived promptly pushing me out that
                single story. Good thing he came because the laundry detergent
                allowed me to do my first load of laundry.
              </p>

              <p>
                I washed the bedsheet covering my mattress and the big, heavy
                blanket I had been given upon arrival. Over the years, living
                away from the comforts of home, I&apos;ve learned that a good night&apos;s
                sleep is essential. If I wanted to rest, I needed clean sheets
                and a clean blanket, everything smelling fresh. Once they were
                dry, I made the bed and lay down. I felt like I was waiting for
                something. I had been in pilot mode for too long, moving without
                really arriving.
              </p>

              <p>
                I needed to reconnect. I needed inspiration. I needed to find
                the passion that had carried me all the way to India. I lay
                there, waiting for life to feel real again. With time, I&apos;ve
                learned that the feeling of belonging only comes if one makes
                the effort to belong. We hold in our hands the ability to adapt,
                to learn, to fit in. It&apos;s in our nature to want to be part of
                something, a family, a friendship, a relationship, a community,
                a belief system.
              </p>

              <p>
                And so, to belong, we adopt customs, traditions, and habits. We
                dress with similar colors, develop shared tastes, speak the same
                idioms. All of it helps us feel cared for, protected, part of
                something larger than ourselves. Laying there alone in the
                comfort of my new room, in the middle of a city of four million
                people in north India I wondered on how I was going to snap out
                of pilot mode and become part of a new community.
              </p>

              <p>
                A community that welcomed me with a rainbow of unfamiliar
                sounds, flavors, colors, habits, and beliefs. How was I going to
                set aside the mannerisms I had collected throughout my life and
                become part of an exchange cohort of twenty-five French
                students. How was I going to become one of them?
              </p>

              <p>
                Two days went by where thousands of questions flooded my mind.
                Those kinds of questions you asks yourself when you&apos;re
                uncomfortable, when you doubt the next steps, when you start
                doubting of the ones already taken. Just a twenty-two-year-old
                girl lying on her bed, watching the fan spin above her,
                wondering if she&apos;d make it out alive. Dramatic, overthinking
                everything.
              </p>

              <p>
                Like the quiet panic you feel when waiting for a message that
                doesn&apos;t arrive, refreshing your phone over and over again. Those
                days felt eternal. No one had answered my messages in the common
                group chat, and I had no idea when other exchange students would
                arrive. This time, snapping out of pilot mode was harder. It
                took longer. I had two days alone, suspended in the limbo
                between what was yet to come and everything I had left behind.
              </p>
            </div>
          </div>
        )}
        {/* CHAPTER 3 */}
        <button
          className="journal-button"
          onClick={() => toggleJournal("india3")}
        >
          <div>
            <div className="india-meta">
              <span>Lucknow, India</span>
              <span>2025</span>
            </div>
            <h3 className="india-title">3. Finding My People</h3>
          </div>
          {openJournal === "india3" ? (
            <ChevronUp color="#032C7D" />
          ) : (
            <ChevronDown color="#032C7D" />
          )}
        </button>

        {openJournal === "india3" && (
          <div className="journal-dropdown">
            <div className="journal-body">
              <p>
                <span className="dropcap-india">O</span>n the 8th and 9th of
                September, the other rooms began to light up one by one: 304,
                314, 328, 326, 323, and so on. People arrived full of
                excitement, filling the corridors with noise and sounds. Some
                stood in the dorm hallways smoking cigarettes, overwhelmed by
                the heavy heat of late summer, sharing stories of their
                journeys, complaining about delays, visas, and first impressions
                of a country so often left on the sidelines of world travel.
                <img
                  src="IndianJournal3.jpg"
                  alt="Finding My People"
                  style={{
                    width: "45%",
                    float: "right",
                    marginLeft: "25px",
                    marginBottom: "15px",
                    borderRadius: "12px",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                  }}
                />
              </p>

              <p>
                Others unpacked in silence, spending the day cursing under their
                breath. Annoyed that the rooms were empty, that the heat felt
                too dense, that everything was covered in dust. It was a mix of
                emotions: excitement mixed with frustration.
              </p>

              <p>
                The room next to mine lit up that Tuesday morning. A sweet
                French girl walked in, dragging heavy luggage, visibly exhausted
                from a long journey. I smiled and welcomed her. She was kind and
                seemed genuinely excited to be here. She told me that India had
                greeted her with loud honking cars, endless immigration forms,
                and the heavy summer heat.
              </p>

              <p>
                We chatted for a while, and, in the absence of any cleaning
                products, she suggested we go to the mall. The goal was simple:
                buy bedsheets and everything needed to keep our shared bathroom
                clean. I agreed without hesitation, and together with three
                other guys, we hopped into an Uber and headed out.
              </p>

              <p>
                The trip took all day. We ran our errands quickly, but we stayed
                longer than planned. It felt as if we were hiding from the
                outside world. I watched them discusses, debate, compare. They
                talked about how non of them had chosen to come here as their
                first option, how India had been a second or thirds choice,
                something they had ended up with rather than sought out.
                Something that felt strange to me, since India was something I
                had planned, something I had dreamt of.
              </p>

              <p>
                From time to time, I drifted out of the conversation. Most of it
                was spoken in French, and I caught maybe forty percent of what
                was being said. I listened more than I spoke, observing their
                expressions, tones, pauses. Funny how the world works, I would
                end up learning French in India.
              </p>

              <p>
                We took a taxi back home, and everyone went back to unpacking.
                That night I understood something: The people I had met that day
                weren&apos;t my people, not yet, but they were enough to show me that
                I needed to look deeper.
              </p>

              <p>
                <strong>10/09/2025</strong>
                <br />
                Two days went by before I met the people who would accompany me
                through this experience. On the evening of the 8th, a group of
                us drank beers and played some games in the living room at the
                corner of the corridor. It was a simple: a large space, with two
                long couches and two single couches pushed against the walls.
              </p>

              <p>
                Most conversations happened in French, with the occasional
                switch to English to ask me a question. Since I understood very
                little, I mostly nodded and smiled, drank my beer quietly, and
                tried to grasp the rhythm of what was being said. It was harder
                than any other time I&apos;d been surrounded by people I didn&apos;t know.
                Usually, there&aposs another foreigner who doesn&apos;t speak the common
                language either, or the group is diverse enough that English
                becomes the obvious choice. This time, I had to put in three
                times the effort. There was no other option.
              </p>

              <p>
                During the day, we went on our first side quest: finding SIM
                cards for the guys who had just arrived. I came along, since it
                was my first time outside campus. While they struggled to
                communicate with the Airtel desk man, I took the chance to
                observe and explore the neighborhood. We walked past chanting
                mantras and were invited to stop and listen. We ate kebabs from
                a street-food stand next to the Airtel office and tried our
                first samosa across the street, in what seemed to be a very
                popular spot.
              </p>

              <p>
                Our curious eyes took in the stores, the people, the noise, the
                restaurants, while people&apos;s eyes lingered on us just as much.
                Hours passed, and they were still trying to sort out the SIM
                subscriptions. As I stood outside the shop waiting, a girl
                across the street stared at me, smiling, giggling. After a
                while, I waved. With visible shyness, she waved back, laughing
                and whispering into her brothers&apos; ear. They crossed the street
                towards us.
              </p>

              <p>
                In a nervous voice, with a giggly smile, she said to me, &quot;you
                are beautiful&quot;. I smiled back. &quot;You are beautiful too! What&apos;s
                your name?&quot; &quot;Diya,&quot; she said. She told me she was twelve and
                that it was the first time she had seen a foreigner. She said
                she thought I looked beautiful and that she was happy we could
                finally talk. Her brother had been pushing her to come say
                hello, but she&apos;d been too shy. Politely, she asked if we could
                take a picture now that I was here. And so we did. My first
                picture with a stranger, the first of many.
              </p>

              <p>
                Getting back to campus was an experience in itself. There was
                six of us, an non of us wanted to split up, so we all squeezed
                into a single tuk-tuk. It carried us through traffic jams and
                back into the university grounds, laughing and holding on as we
                went.
              </p>

              <p>
                That night, almost the entire cohort was finally there. After
                dinner, while some of the girls and guys smoked cigarettes, I
                noticed a curly-haired girl sitting on the edge of the stairway.
                She was short, with a friendly smile and a calm, unbothered
                posture that made her stand out from the otherwise homogeneous
                crowd. Her curious eyes drew me in, and I sat next to her and
                said hi.
              </p>

              <p>
                She knew I was the Spanish-speaking girl, the outlier of the
                group, but instead of asking why had I chosen to come to IIM
                Lucknow knowing I was going to be surrounded by so many French
                students, she asked about me. Who was I? Why was I in India? We
                talked with such lightness, such ease, that for the first time
                it felt possible to find my people among so many unknown faces.
              </p>

              <p>
                Later that night, we gathered again in the living room. This
                time, it wasn&apos;t just beers but some six-euro bottles of vodka
                too. With a bit of liquid courage and a gentle push, the walls
                we&apos;d all been carrying came down. That&apos;s when I met the ones who
                would become my people.
              </p>

              <p>
                Mag, the cutest blond girl, with the sweetest smile. Just as
                scared and anxious about not fitting in as I was. Her excitement
                for a new adventure, despite it being completely outside her
                comfort zone, impressed me. She was from Paris, born and raised
                in the city, used to its comforts, yet carried a quiet curiosity
                and a love for beautiful things that had brought her all the way
                to India.
              </p>

              <p>
                Nahel and Flo stood out because of their outgoing spirit,
                unafraid, genuinely excited to be starting a new adventure
                across the world. They had been best friends for a while, and
                each other&apos;s presence, among a crowd of unknown faces, seemed to
                give them the confidence to be as open and friendly as possible.
                It was clear they were simply there to enjoy themselves. Their
                happiness was contagious, making anyone feel comfortable, at
                ease, and welcome in the conversation.
              </p>

              <p>
                Louise and Solal were a little less loud, but with the same lack
                of fear for the unknown in their eyes. We talked for a while in
                Spanish, I&apos;m guessing alcohol helped them piece together what
                they remembered from high school. They smiled easily, made
                jokes, and from time to time translated things into English,
                making sure I felt included, making me feel part of something
                good.
              </p>

              <p>
                The excitement everyone carried that night filled the room,
                spreading a quiet sense of hope for a promising semester. Over
                beers, I made a decision. I knew these names would stay with me.
                I understood that no language barrier and no stereotype would
                stop us from making our time in this country the best we
                possibly could.
              </p>
            </div>
          </div>
        )}
      </section>
      <p></p>
      {/* GALLERY WALL */}
      <section className="gallery-wall" id="gallery">
        {" "}
        {/* Added id="gallery" here */}
        <div className="gallery-card">
          <img src="/Aliette.JPG" alt="Gallery" />
        </div>
        <div className="gallery-card">
          <img src="/MotherSon.JPG" alt="Gallery" />
        </div>
        <div className="gallery-card">
          <img src="/FloatingMarket.JPG" alt="Gallery" />
        </div>
        <div className="gallery-card">
          <img src="/Colombia.JPG" alt="Gallery" />
        </div>
        <div className="gallery-card">
          <img src="/BoatSiemReap.JPG" alt="Gallery" />
        </div>
        <div className="gallery-card">
          <img src="/ayhodya.JPG" alt="Gallery" />
        </div>
        <div className="gallery-card">
          <img src="/Friends.JPG" alt="Gallery" />
        </div>
        <div className="gallery-card">
          <img src="/SleepingThailand.JPG" alt="Gallery" />
        </div>
        <div className="gallery-card">
          <img src="/RedFort.JPG" alt="Gallery" />
        </div>
        <div className="gallery-card">
          <img src="/StreetsShanghai.jpg" alt="Gallery" />
        </div>
        <div className="gallery-card">
          <img src="/Friends2.JPG" alt="Gallery" />
        </div>
        <div className="gallery-card">
          <img src="/Rain.JPG" alt="Gallery" />
        </div>
        <div className="gallery-card">
          <img src="/Police.JPG" alt="Gallery" />
        </div>
        <div className="gallery-card">
          <img src="/girl.JPG" alt="Gallery" />
        </div>
        <div className="gallery-card">
          <img src="/RickShaw.JPG" alt="Gallery" />
        </div>
      </section>
      {/* TIMELINE SECTION - FULL ORIGINAL RESTORED */}
      <section className="timeline" id="resume">
        <div className="tl-item">
          <span style={{ fontWeight: 700, color: "var(--rust)" }}>
            2003 – 2021 | Ecuador & Latin America
          </span>
          <h3
            style={{
              fontFamily: "Playfair Display",
              fontSize: 22,
              margin: "5px 0",
            }}
          >
            Learning before labeling
          </h3>
          <p style={{ fontSize: 14, color: "#4A433D" }}>
            These years were about curiosity taking shape. I questioned and
            observed, slowly understanding the world beyond my immediate
            context.
          </p>
        </div>

        <div className="tl-item">
          <span style={{ fontWeight: 700, color: "var(--rust)" }}>
            2021 – 2024 | Rome · China · SE Asia
          </span>
          <h3
            style={{
              fontFamily: "Playfair Display",
              fontSize: 22,
              margin: "5px 0",
            }}
          >
            Finding structure in complexity
          </h3>
          <p style={{ fontSize: 14, color: "#4A433D" }}>
            <strong>Rome:</strong> Global Governance & Economics, where my
            curiosity finally found language, structure, and systems.
            <br />
            <strong>China:</strong> Tsinghua University showed me how scale and
            long-term thinking in action deliver results.
          </p>
          <span className="side-quest">
            <strong>Side Quest:</strong> Six weeks solo traveling across
            Southeast Asia learning adaptability, humility, and how context
            reshapes perspectives faster than any classroom.
          </span>
        </div>

        <div className="tl-item">
          <span style={{ fontWeight: 700, color: "var(--rust)" }}>
            2024 – 2026 | Venice · India
          </span>
          <h3
            style={{
              fontFamily: "Playfair Display",
              fontSize: 22,
              margin: "5px 0",
            }}
          >
            From understanding to building
          </h3>
          <p style={{ fontSize: 14, color: "#4A433D" }}>
            <strong>Venice:</strong> MSc in Global Development &
            Entrepreneurship. Focusing on innovation, strategy, and how ideas
            turn into scalable impact.
            <br />
            <strong>India:</strong> This exchange experience gave me access to
            the insides of corporate entrepreneurship and strategy in one of the
            world&apos;s most complex markets.
          </p>
          <span className="side-quest">
            <strong>Side Quest:</strong> Traveling across India allowed me to
            break stereotypes, confront contradictions, and learn that growth
            happens far outside our comfort zones.
          </span>
        </div>
      </section>
      {/* START DIALOGUE BUTTON */}
      <button className="cta-ticket" onClick={() => setModal(true)}>
        <span style={{ padding: "14px 20px", fontWeight: 600 }}>
          Start a Dialogue
        </span>
        <span
          style={{
            background: "#0841C9", //
            padding: "14px",
            borderRadius: "0 12px 12px 0",
          }}
        >
          <ArrowUpRight size={18} />
        </span>
      </button>
      {/* FOOTER */}
      <footer
        style={{
          padding: "60px 20px",
          textAlign: "center",
          borderTop: "1px solid #EEE",
          marginTop: "40px",
        }}
      >
        <p
          style={{
            fontFamily: "Playfair Display",
            fontSize: "14px",
            color: "#032C7D",
            marginBottom: "10px",
          }}
        >
          © 2026 Maria Paz Galarraga. All Rights Reserved.
        </p>
        <p
          style={{
            fontSize: "11px",
            color: "var(--mustard)",
            textTransform: "uppercase",
            letterSpacing: "1px",
          }}
        >
          Photographs and original text may not be reproduced without
          permission.
        </p>
      </footer>
      );
    </>
  );
}
