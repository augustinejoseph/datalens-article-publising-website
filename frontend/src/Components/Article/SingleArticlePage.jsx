import React from "react";
import "./SingleArticlePage.css";
import HomePostContainer from "../Home/HomePostContainer";
import Footer from "../Footer/Footer"
const ArticlePage = () => {

  return (
    <div className="article_container">
      <div className="article_inner_container">
        <div className="article_main_image">
          <img src="https://miro.medium.com/v2/resize:fit:828/format:webp/1*TUEbbjZ0BUQutZ6951Wg6Q.jpeg" />
        </div>
        <div className="article_main_heading">
          <span>
            Reddit’s Latest Mod Revolt Highlights a Question Bigger than API
            Pricing: Who “Owns It”?
          </span>
        </div>
        <div className="article_author_container">
          <span className="article_author_name">Author Name</span>
          <div className="article_reading_details">
            <span>5 Min Read</span>
            <span>4 days ago</span>
          </div>
        </div>

        <div className="article_interaction">
          <div className="article_interaction_leftside">
            <img src="https://img.icons8.com/?size=512&id=Yv8CCpT6tRjg&format=png" />
            <span>126</span>
            <img src="https://img.icons8.com/?size=512&id=143&format=png" />
            <span>21</span>
          </div>
          <div className="article_interaction_rightside"></div>
          <div className="article_share_commend_icon">
            <span>share</span>
            <span>Commend</span>
            <span>Read</span>
          </div>
        </div>
        <div className="article_content_start">
          <p>
            This Monday, from June 12th, Reddit is facing a “blackout”, meaning
            many subreddit moderators will turn their subs temporarily —
            possibly for two days — private in protest of Reddit’s recently
            announced API pricing changes¹. However I believe this conflict is a
            sign of more to come, and it raises questions about who the
            stakeholders in a social media platform are. API Access and pricing,
            here we go again A couple of months back Reddit announced that it
            would introduce a paid API tier², in addition to some other changes
            such as API access to NSFW (“not safe for work”) content. Charging a
            juicy price for API access sounds familiar? Didn’t we just go
            through the same with Twitter? We come back to that later. Some
            changes were expected after OpenAI revealed that it used Reddit’s
            API on a massive scale to feed training data into its GPT models,
            something Reddit obviously wasn’t amused about. The obvious fear is
            that the changes in API access will restrict and very possible
            completely end third-party apps like Apollo, Reddit is Fun or
            advanced search tools like Camas. Those third-party apps have grown
            extremely popular over time, not the least because of Reddit’s own
            long standing negligence of mobile for many years. For many users
            those third-party apps and tools have made Reddit what it is today:
            the 20th largest website in the world according to Similarweb. For
            many users those third-party apps and tools have made Reddit what it
            is today Those fears seem to be well founded: One developer of the
            Apollo app has — after directly negotiating with Reddit — stated
            that if prices stayed as announced the project would have to pay
            “about 1.7 million dollars per month, or 20 million US dollars per
            year”³. (Update: The developers of Apollo have now announced that
            they will close the app on June 30th⁶) Hence, while Reddit has
            praised the work of third-party developers, the suspicion is that
            this is not so much about making some extra API profit, but a
            strategy to shut down third-party apps all together and a plan to
            drive users to the official — ad supported — Reddit mobile app. In
            addition, as many users have commented, that this might just be a
            sign of changes to come, and that eventually other third-party tools
            currently unaffected by the changes will have to go, too. So far the
            moderators of over 1000 subs have announced to join the blackout⁴,
            including some of the largest subs with more than 30 million
            members. It’s not the first time subreddit mods have staged a
            blackout in protest, with the most prominent example the “AMAgeddon”
            blackout of 2015, when mods protested the sacking of Victoria
            Taylor⁵, a popular Reddit admin who facilitated many “Ask Me
            Anything(AMA)” events. Stakeholders — Who made Reddit what it is,
            and who “owns it”? Like Twitter in its first years, early Reddit was
            a rather barebone service greatly shaped by its users. For younger
            users this time may lie in the ancient past but it differs
            significantly from other platforms like Instagram or TikTok, who
            either came along as polished products or were never particularly
            “open”. More than any other platform Reddit users not only provide
            content: Reddit is overwhelmingly moderated by its user mods and
            have shaped to make a platform with relatively sparse features
            massively enjoyable. They have also shaped the culture and way
            Reddit is being used. Reddit mods act also — as proven by their
            concerted protests — more as “community” than on any other platform.
            Users have invested countless hours of their life into the platform
            … and understandably have developed a feeling of “shared ownership”.
            Populated with user content, moderated by volunteer mods and
            supported by tools created by enthusiasts, users have invested
            countless hours of their life (and often money, too) into the
            platform — many being involved for longer than a decade - and
            understandably have developed a feeling of “shared ownership”:
            Reddit the company runs the technical service, users and mods
            provide the rest. And when it comes to third-party apps and tools,
            many developers feel those tools apps should be treated with the
            same level of respect as Reddit itself. Why now? Other than Twitter,
            Reddit has not been taken over by some megalomaniac billionaire, and
            differently from Musk’s Twitter, Reddit has not publicly indicated a
            major paradigm change for its platform, so what’s going on? There is
            of course Reddit’s long discussed IPO on the horizon, a thorny
            issue: Potential investors will expect Reddit to have the platform
            under control, technically as well as socially. Which is — in the
            case of Reddit — a challenge due to its quite anarchic history. This
            has already let to an obvious increase in advertisement (with banner
            ads and promoted links) and experiments to turn other features into
            money. However it is hard to imagine that a mod protests and
            multi-day blackouts will make Reddit more attractive to investors
            (imagine this with a publicly traded company). Twitter’s recent
            purge of third-party apps has certainly left a bad taste What I find
            strange however is why Reddit — who should clearly have seen this
            conflict coming — has chosen to pick this fight now. Twitter’s
            recent purge of third-party apps has certainly left a bad taste; and
            let’s not forget that many of the third-party developers are the
            same people who were targeted by Twitter. A Wider Question for
            social media There is no doubt that providing an API service costs
            money and bills need to be paid. And — legally — Reddit the business
            has of course the right to do what it wants. But because of the
            history of Reddit the question of why mods and developers should
            invest time and work, and to what extend they are being seen by the
            company as stakeholders, is one Reddit has to answer in some way or
            the other. Twitter has shown not to care but Reddit might answer
            this differently. If Reddit is genuine about its concerns about the
            abuse of the API by data scrapers like OpenAI, an arrangement with
            legit third-party apps should be possible. If, on the other hand,
            this is truly an attempt to optimise monetisation in the run up to
            an IPO, including being part of a strategy to shut down apps
            indirectly and possibly other tools later, this will be a hard sell:
            Reddit moderators hold an unusual amount of power for users on a
            social media platform.
          </p>
        </div>
        {/* Related */}

        <div className="article_related_articles">
        < HomePostContainer />
        < HomePostContainer />
        < HomePostContainer />

        </div>
        < Footer />
      </div>
    </div>
  );
};

export default ArticlePage;
