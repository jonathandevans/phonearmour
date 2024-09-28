import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./page.module.css";
import { faArrowRight, faCheck, faStar } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@/components/button/button";
import { Slideshow } from "@/components/slideshow/slideshow";

const Page = () => {
  return (
    <>
      <section className={styles.hero}>
        <div className={styles.text}>
          <h1>
            Get Your Image on a <span>Custom</span> Phone Case.
          </h1>
          <p>
            Capture your favourite memories with your own, one-of-a-kind phone
            case. <span>PhoneArmor</span> allows you to protect your memories,
            not just your phone case.
          </p>
          <ul>
            <li>
              <FontAwesomeIcon icon={faCheck} className={styles.icon} />{" "}
              High-quality, durable material
            </li>
            <li>
              <FontAwesomeIcon icon={faCheck} className={styles.icon} /> 1 year
              print guarantee
            </li>
            <li>
              <FontAwesomeIcon icon={faCheck} className={styles.icon} /> 10-day
              No Question Asked Return or Exchange
            </li>
          </ul>

          <Button variant={{ colour: "red" }} className={styles.button}>Create Your Own Case <FontAwesomeIcon icon={faArrowRight} className={styles.icon}/></Button>
        </div>

        <img src="/cases.png" />
      </section>

      <section className={styles.example}>
        <h2>Upload your photo and get <span>your own case</span> now</h2>
        <Slideshow />
      </section>

      <section className={styles.testimonials}>
        <div className={styles.inner}>
          <h2>
            What our{" "}
            <span>
              customers
              <svg viewBox="0 0 687 155" className={styles.underline}>
                <g
                  stroke="var(--red-500)"
                  strokeWidth="7"
                  fill="none"
                  fillRule="evenodd"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path
                    d="M20 98c27-13.3333333 54-20 81-20 40.5 0 40.5 20 81 20s40.626917-20 81-20 40.123083 20 80.5 20 40.5-20 81-20 40.5 20 81 20 40.626917-20 81-20c26.915389 0 53.748722 6.6666667 80.5 20"
                    opacity=".3"
                  ></path>
                  <path d="M20 118c27-13.3333333 54-20 81-20 40.5 0 40.5 20 81 20s40.626917-20 81-20 40.123083 20 80.5 20 40.5-20 81-20 40.5 20 81 20 40.626917-20 81-20c26.915389 0 53.748722 6.6666667 80.5 20"></path>
                </g>
              </svg>
            </span>{" "}
            say
          </h2>

          <div className={styles.list}>
            <article className={styles.testimonial}>
              <div className={styles.rating}>
                <FontAwesomeIcon icon={faStar} className={styles.icon} />
                <FontAwesomeIcon icon={faStar} className={styles.icon} />
                <FontAwesomeIcon icon={faStar} className={styles.icon} />
                <FontAwesomeIcon icon={faStar} className={styles.icon} />
                <FontAwesomeIcon icon={faStar} className={styles.icon} />
              </div>
              <p>
                "The case feels durable and I even got a compliment on the
                design. Had the case for two and a half months now and{" "}
                <span>the image is super clear</span>, on the case I had before,
                the image started fading into yellow-ish colour after a couple
                weeks. Love it."
              </p>
              <div className={styles.author}>
                <img src="/test-1.jpg" />
                <div>
                  <p className={styles.name}>Charlie</p>
                  <p>
                    <FontAwesomeIcon icon={faCheck} className={styles.icon} />{" "}
                    Verified Purchase
                  </p>
                </div>
              </div>
            </article>

            <article className={styles.testimonial}>
              <div className={styles.rating}>
                <FontAwesomeIcon icon={faStar} className={styles.icon} />
                <FontAwesomeIcon icon={faStar} className={styles.icon} />
                <FontAwesomeIcon icon={faStar} className={styles.icon} />
                <FontAwesomeIcon icon={faStar} className={styles.icon} />
                <FontAwesomeIcon icon={faStar} className={styles.icon} />
              </div>
              <p>
                "I usually keep my phone together with my keys in my pocket and
                that led to some pretty heavy scratch marks on all of my last
                phone cases. This one, besides a barely noticeable scratch on
                the corner, <span>looks brand new after about half a year</span>
                . I dig it."
              </p>
              <div className={styles.author}>
                <img src="/test-2.png" />
                <div>
                  <p className={styles.name}>Emma</p>
                  <p>
                    <FontAwesomeIcon icon={faCheck} className={styles.icon} />{" "}
                    Verified Purchase
                  </p>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>
    </>
  );
};
export default Page;
