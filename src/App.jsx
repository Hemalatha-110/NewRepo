import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link, useParams } from "react-router-dom";
import { FaThumbsUp, FaComment, FaWhatsapp, FaInstagram, FaTwitter, FaFacebook } from "react-icons/fa";
import PropTypes from "prop-types"; 


const blogsData = [
  { id: 1, img: "https://i.ytimg.com/vi/t7dclYsSpEU/maxresdefault.jpg", title: "The Secret to a Productive Morning Routine", content: "A productive morning routine can set the tone for a successful day.....", fullContent: "A productive morning routine can set the tone for a successful day. But what does an ideal morning look like? The first step is waking up early—but not too early. While the idea of rising before sunrise sounds productive, getting enough sleep is just as important. Aim for 7-9 hours of rest so you wake up refreshed. Once you're up, hydrate immediately. Your body dehydrates overnight, and drinking a glass of water first thing helps kickstart your metabolism and brain function.After hydrating, it's time to move. Whether it’s a full workout, some stretching, or yoga, physical activity in the morning increases energy levels and releases endorphins, helping you feel good for the rest of the day. Another key to productivity is planning. Before diving into work, take a few minutes to outline your goals. A simple to-do list can help you stay on track and reduce stress.One common mistake many people make is checking their phones right after waking up. Scrolling through social media or emails can overwhelm you before the day even starts. Try waiting at least 30 minutes before using your phone. Instead, use that time to enjoy a nutritious breakfast. Eating a meal rich in protein, healthy fats, and fiber gives you the fuel needed to stay productive and avoid energy crashes.A great morning routine isn’t about perfection; it’s about consistency. Small changes, like drinking water, planning your day, and avoiding distractions, can significantly impact your productivity. Try implementing these habits and watch how your mornings—and your entire day—improve!" },
  { id: 2, img: "https://d2fl3xywvvllvq.cloudfront.net/wp-content/uploads/2021/08/motivation-1.jpg", title: "How to Stay Motivated When Working from Home", content: "Working from home has become the new normal, offering flexibility but also bringing challenges......", fullContent: "Working from home has become the new normal, offering flexibility but also bringing challenges like staying motivated. Without the structure of an office, it’s easy to get distracted or lose focus. The first step to staying productive is setting up a dedicated workspace. Instead of working from your bed or couch, create a space where you can focus without interruptions. An organized and clutter-free environment can significantly boost motivation.Dressing for the day also makes a difference. While it’s tempting to stay in pajamas, wearing casual but work-appropriate clothes helps shift your mindset into work mode. Additionally, sticking to a set schedule is essential. Define your work hours, take regular breaks, and maintain a routine to keep yourself accountable. One great method to manage time is the Pomodoro Technique—work for 25 minutes, then take a 5-minute break to refresh your mind.Distractions are one of the biggest challenges of remote work. Turn off unnecessary notifications, set boundaries with family members, and use noise-canceling headphones if needed. It’s also important to maintain social connections. Working alone can feel isolating, so schedule virtual meetings, participate in online group chats, or have regular check-ins with colleagues to stay connected.To keep motivation high, reward yourself for completing tasks. Whether it’s a short walk, a coffee break, or watching an episode of your favorite show, small incentives can keep you on track. Working from home requires discipline, but by creating a structured environment and setting goals, you can stay motivated and productive throughout the day." },
  { id: 3, img: "https://miro.medium.com/v2/resize:fit:1400/0*hFxsDJQBCp01Jkdy.jpeg", title: "The Best Budget Travel Tips for 2025", content: "Traveling the world doesn’t have to be expensive. With smart planning...", fullContent: "Traveling the world doesn’t have to be expensive. With smart planning and the right strategies, you can explore amazing destinations without breaking the bank. One of the best ways to save money is by being flexible with your travel dates. Flight and hotel prices vary depending on the season, so if you’re open to traveling during off-peak times, you can find much cheaper deals. Using fare comparison websites like Skyscanner or Google Flights can also help you find the best airline prices.Instead of staying in pricey hotels, consider alternative accommodations such as hostels, Airbnb, or even couch-surfing. Not only are these options budget-friendly, but they can also provide unique and memorable experiences. Another great way to save money is by using public transportation instead of taxis or rental cars. Many cities have excellent bus and train systems that are both convenient and affordable.Food is another area where you can cut costs. Instead of dining at expensive tourist restaurants, eat like a local. Street food, local markets, and small family-owned restaurants often offer delicious meals at a fraction of the price. When planning activities, look for free or low-cost options. Many cities have free museums, walking tours, and cultural events that allow you to explore without spending a fortune.Packing wisely is also essential. Avoid extra baggage fees by traveling light and bringing only the essentials. A well-packed carry-on can save you money and make your trip more convenient. Traveling on a budget doesn’t mean sacrificing experiences—it means making smarter choices. With these tips, you can make 2025 your most affordable and exciting travel year yet!" },
];

const BlogCard = ({ blog }) => {
  const [likes, setLikes] = useState(() => parseInt(localStorage.getItem(`likes-${blog.id}`)) || 0);
  const [comments] = useState(() => JSON.parse(localStorage.getItem(`comments-${blog.id}`)) || []);

  useEffect(() => {
    localStorage.setItem(`likes-${blog.id}`, likes);
  }, [likes, blog.id]);

  return (
    <div className="blog-card">
      <img src={blog.img} />
      <h2 className="blog-title">{blog.title}</h2>
      <p className="blog-content">{blog.content}</p>

      <div className="blog-actions">
        <button onClick={() => setLikes(likes + 1)} className="like-button">
          <FaThumbsUp /> {likes}
        </button>
        <Link to={`/blog/${blog.id}`} className="read-more-link">Read More</Link>
        <div className="comments-info">
          <FaComment /> {comments.length}
        </div>
      </div>
    </div>
  );
};

BlogCard.propTypes = {
  blog: PropTypes.shape({
    id: PropTypes.number.isRequired,
    img: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  }).isRequired,
};

const BlogPage = () => {
  const { id } = useParams();
  const blog = blogsData.find(blog => blog.id === parseInt(id));
  const [likes, setLikes] = useState(() => parseInt(localStorage.getItem(`likes-${blog.id}`)) || 0);
  const [comments, setComments] = useState(() => JSON.parse(localStorage.getItem(`comments-${blog.id}`)) || []);
  const [commentText, setCommentText] = useState("");

  useEffect(() => {
    localStorage.setItem(`likes-${blog.id}`, likes);
    localStorage.setItem(`comments-${blog.id}`, JSON.stringify(comments));
  }, [likes, comments, blog.id]);

  const handleAddComment = () => {
    if (commentText) {
      setComments([...comments, commentText]);
      setCommentText("");
    }
  };

  return (
    <div className="blog-page">
      <img src={blog.img} className = "blog-page-img"/>
      <h1 className="blog-title">{blog.title}</h1>
      <p className="blog-content">{blog.fullContent}</p>
      <button onClick={() => setLikes(likes + 1)} className="like-button">
        <FaThumbsUp /> {likes}
      </button>
      <div className="comments-section">
        <h3 className="comments-header">Comments</h3>
        {comments.map((comment, index) => (
          <p key={index} className="comment">{comment}</p>
        ))}
        <input
          type="text"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Add a comment"
          className="comment-input"
        />
        <button onClick={handleAddComment} className="post-comment-button">Post Comment</button>
      </div>
    </div>
  );
};

const Footer = () => (
  <footer className="footer">
    <FaWhatsapp className="social-icon" />
    <FaInstagram className="social-icon" />
    <FaTwitter className="social-icon" />
    <FaFacebook className="social-icon" />
  </footer>
);

const HomePage = () => (
  <div className="home-page">
    <h1 className="home-header">Welcome to the Blog</h1>
    <div className="blog-cards">
      {blogsData.map(blog => (
        <BlogCard key={blog.id} blog={blog} />
      ))}
    </div>
    <Footer />
  </div>
);

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/blog/:id" element={<BlogPage />} />
    </Routes>
  </Router>
);

export default App;
