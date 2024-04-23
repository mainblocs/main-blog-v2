export const projects = [
	{
		client: 'sarah haran',
		title: 'Lets find the perfect bag for you',
		description:
			'online destination for premium luxury bags. Indulge in our curated collection of designer pieces without the retail markup. Elevate your style with timeless elegance.',
		summary: [
			'online destination for premium luxury bags. Indulge in our curated collection of designer pieces without the retail markup. Elevate your style with timeless elegance.',
			'As a Shopify agency, we meticulously craft your online store to ensure a seamless, premium shopping experience. Elevate your style, effortlessly.'
		],
		logo: '/sarah.avif',
		image: { src: '/sarah-hero.png' },
		date: '2023-01',
		service: 'Web development, CMS',
		testimonial: {
			author: { name: 'sarah haran', role: 'CEO of sarah haran' },
			content:
				'Working with Studio, we felt more like a partner than a customer. They really resonated with our mission to change the way people convince their parents to cash out their pensions.'
		},
		href: '/work/sarah-work',
		slug: 'sarah-work',
		improvements: [
			{
				scale: '50%',
				title: 'more traffic'
			},
			{
				scale: '10x',
				title: 'page load time'
			},
			{
				scale: '15% >',
				title: 'Increase in revenue'
			},
			{
				scale: '300%',
				title: 'customer satisfaction'
			}
		]
	},
	{
		client: 'aroma88',
		title: 'aroma88: Illuminate Moments',
		description:
			'Light up your memories with aroma88, an innovative candle company dedicated to crafting unique candles that do more than illuminate your spaces; they encapsulate and bring to life your most cherished moments.',
		summary: [
			'Light up your memories with aroma88, an innovative candle company dedicated to crafting unique candles that do more than illuminate your spaces; they encapsulate and bring to life your most cherished moments.'
		],
		logo: '/aroma88-logo.avif',
		image: { src: '/aroma88-hero.png' },
		date: '2022-06',
		service: 'Web development, seo, ads development',
		testimonial: {
			author: { name: 'shiva kandel', role: 'CPO of aroma88' },
			content:
				'The team at Studio went above and beyond with our onboarding, even finding a way to access the user’s microphone without triggering one of those annoying permission dialogs.'
		},
		href: '/work/aroma88-work',
		slug: 'aroma88-work',
		improvements: [
			{
				scale: '50%',
				title: 'more traffic'
			},
			{
				scale: '10x',
				title: 'page load time'
			},
			{
				scale: '15% >',
				title: 'Increase in revenue'
			},
			{
				scale: '300%',
				title: 'customer satisfaction'
			}
		]
	},
	{
		client: 'madsen',
		title: 'Madsen Cycles: Carry Your World',
		description:
			'Madsen Cycles offers innovative cargo bikes designed for everyday transportation needs. With a focus on quality, safety, and practicality, their signature bucket bikes provide a fun, eco-friendly way for families to carry children, groceries, and more, turning everyday trips into adventures.',
		summary: [
			'Madsen Cycles offers innovative cargo bikes designed for everyday transportation needs. With a focus on quality, safety, and practicality, their signature bucket bikes provide a fun, eco-friendly way for families to carry children, groceries, and more, turning everyday trips into adventures.'
		],
		logo: '/madsen-logo.avif',
		image: { src: '/madsen-hero.png' },
		date: '2020-10',
		service: 'Web development, Seo, Ads Development',
		testimonial: {
			author: { name: 'Smith Grant', role: 'Head of Engineering at madsen' },
			content:
				'Exceptional team! Their expertise in development, SEO, and ads not only boosted our online presence but also significantly increased our sales and customer engagement. Highly recommended for any business looking to thrive online.'
		},
		href: '/work/madsen-work',
		slug: 'madsen-work',
		improvements: [
			{
				scale: '50%',
				title: 'more traffic'
			},
			{
				scale: '10x',
				title: 'page load time'
			},
			{
				scale: '15% >',
				title: 'Increase in revenue'
			},
			{
				scale: '300%',
				title: 'customer satisfaction'
			}
		]
	},
	{
		client: 'AsaNA REBEL',
		title: 'It is time to be a rebel',
		description:
			'Our holistic approach and user-friendly platform make it easier for people of all fitness levels to start and sustain a healthier and more balanced lifestyle.',
		summary: [
			'Our holistic approach and user-friendly platform make it easier for people of all fitness levels to start and sustain a healthier and more balanced lifestyle.',
			'Asana Rebel is a digital wellness company that provides a comprehensive and customizable app, offering yoga exercises, guided meditations, and wellness content to empower individuals in their physical and mental wellbeing journey.'
		],
		logo: '/asana-logo.png',
		image: { src: '/asana-hero.png' },
		date: '2022-10',
		service: 'Web development, Seo, Ads Development',
		testimonial: {
			author: { name: 'Beth and Harry', role: 'Founders' },
			content:
				"We at Asana Rebel couldn't be happier with the services provided by MainBlocs. Their expertise in SEO, web development, and advertising has significantly enhanced our online presence and user engagement. The team is professional, responsive, and consistently exceeds our expectations. We highly recommend aroma88 for any business seeking to optimize its digital presence and drive success."
		},
		href: '/work/asana-work',
		slug: 'asana-work',
		improvements: [
			{
				scale: '50%',
				title: 'more traffic'
			},
			{
				scale: '10x',
				title: 'page load time'
			},
			{
				scale: '15% >',
				title: 'Increase in revenue'
			},
			{
				scale: '300%',
				title: 'customer satisfaction'
			}
		]
	}
];

export function getAllProjects() {
	return projects;
}
