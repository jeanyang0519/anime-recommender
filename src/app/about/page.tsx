"use client";


export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto p-8 space-y-50">
      {/* Message from Jean */}
      <section>
      <h2 className="about-subtitle mt-8">Message from Jean</h2>
      <div className="text-box bg-amber-50 py-10 px-15 shadow mt-15">
        
        
            <p className="text">Hi,</p>
        
            <p className="text whitespace-pre-wrap">
                I'm Jean. I created this website out of a deep love for anime. I grew up watching it
            from my parents&rsquo; apartment in Taipei, and it&rsquo;s been with me through all
            of life&rsquo;s ups and downs. </p>
            <p className="text"> Naruto taught me to chase my dreams fearlessly, Hunter x Hunter
            showed me the true meaning of friendship, and Skip and Loafer reminded
            me to work hard while enjoying the little moments.</p>
            <p className="text"> 
            I hope you&rsquo;ll give anime a try—and maybe, like me, you&rsquo;ll find a spark of
            courage in it too.
            </p>
            <p className="text">Best,<br />Jean</p>
            
      </div>
      </section>
      {/* Page Explanation */}
      <section>
        <h2 className="about-subtitle">What You'll Find on This Site</h2>
        <div className="text-box mt-15">
        <ul className=" list-inside space-y-6 text-lg">
          <li>
            <strong>Random Pick</strong> – A surprise anime recommendation, randomly generated using the AniList API.
          </li>
          <li>
            <strong>Take the Quiz</strong> – Personalized anime suggestions based on your answers.
          </li>
          <li>
            <strong>Jean's Anime List</strong> – My personal collection of anime, thoughtfully curated with love.
          </li>
          <li>
            <strong>Elite Picks</strong> – A random selection from Jean's Anime List—only the best of the best.
          </li>
        </ul>
        </div>
      </section>

      {/* Contact Links */}
      <section>
        <h2 className="about-subtitle">Contact</h2>
        <div className="text-box">
        <ul className="space-y-2 text-lg">
          <li>
            <a
              href="https://jean-yang.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              Portfolio
            </a>
          </li>
          <li>
            <a
              href="https://www.linkedin.com/in/jeanyang-engineer"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              LinkedIn
            </a>
          </li>
          <li>
            <a
              href="https://github.com/jeanyang0519"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              GitHub
            </a>
          </li>
        </ul>
        </div>
      </section>
    </div>
  );
}
