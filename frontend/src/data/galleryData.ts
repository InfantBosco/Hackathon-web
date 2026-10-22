export interface GalleryItem {
  id: string;
  imageFile: string;
  title?: string;
  mediaType: "image" | "video";
  width: number;
  height: number;
  aspectRatio: number;
  orientation: "landscape" | "portrait";
}

export function getOptimizedImageUrl(url: string, width: number = 600): string {
  if (!url) return '';
  return url.replace(/w_\d+/, `w_${width}`);
}

export const galleryItems: GalleryItem[] = [
  {
    "id": "muztwlxdqff3vwjznsns",
    "imageFile": "https://res.cloudinary.com/demc5rxwn/image/upload/f_auto,q_auto,w_1200/v1792662855/muztwlxdqff3vwjznsns.jpg",
    "title": "HackNEX Moment 1",
    "mediaType": "image",
    "width": 4032,
    "height": 3024,
    "aspectRatio": 1.33,
    "orientation": "landscape"
  },
  {
    "id": "ayoqkzu2mc0u4axwkhwj",
    "imageFile": "https://res.cloudinary.com/demc5rxwn/image/upload/f_auto,q_auto,w_1200/v1792662855/ayoqkzu2mc0u4axwkhwj.jpg",
    "title": "HackNEX Moment 2",
    "mediaType": "image",
    "width": 4032,
    "height": 3024,
    "aspectRatio": 1.33,
    "orientation": "landscape"
  },
  {
    "id": "lnroxszfxrhbxpemjlqy",
    "imageFile": "https://res.cloudinary.com/demc5rxwn/image/upload/f_auto,q_auto,w_1200/v1792662854/lnroxszfxrhbxpemjlqy.jpg",
    "title": "HackNEX Moment 3",
    "mediaType": "image",
    "width": 4032,
    "height": 3024,
    "aspectRatio": 1.33,
    "orientation": "landscape"
  },
  {
    "id": "kquklq4xphxaak5bj6ez",
    "imageFile": "https://res.cloudinary.com/demc5rxwn/image/upload/f_auto,q_auto,w_1200/v1792662854/kquklq4xphxaak5bj6ez.jpg",
    "title": "HackNEX Moment 4",
    "mediaType": "image",
    "width": 4032,
    "height": 3024,
    "aspectRatio": 1.33,
    "orientation": "landscape"
  },
  {
    "id": "vsp4cu2fcb6ujbdzvadq",
    "imageFile": "https://res.cloudinary.com/demc5rxwn/image/upload/f_auto,q_auto,w_1200/v1792662854/vsp4cu2fcb6ujbdzvadq.jpg",
    "title": "HackNEX Moment 5",
    "mediaType": "image",
    "width": 4032,
    "height": 3024,
    "aspectRatio": 1.33,
    "orientation": "landscape"
  },
  {
    "id": "ljwf4v6alu90kf1r6lc9",
    "imageFile": "https://res.cloudinary.com/demc5rxwn/image/upload/f_auto,q_auto,w_1200/v1792662853/ljwf4v6alu90kf1r6lc9.jpg",
    "title": "HackNEX Moment 6",
    "mediaType": "image",
    "width": 4032,
    "height": 3024,
    "aspectRatio": 1.33,
    "orientation": "landscape"
  },
  {
    "id": "v7hcbj2jgwh7vdti4jkg",
    "imageFile": "https://res.cloudinary.com/demc5rxwn/image/upload/f_auto,q_auto,w_1200/v1792662853/v7hcbj2jgwh7vdti4jkg.jpg",
    "title": "HackNEX Moment 7",
    "mediaType": "image",
    "width": 4032,
    "height": 3024,
    "aspectRatio": 1.33,
    "orientation": "landscape"
  },
  {
    "id": "f1hrnsd2wludndz2bby4",
    "imageFile": "https://res.cloudinary.com/demc5rxwn/image/upload/f_auto,q_auto,w_1200/v1792662852/f1hrnsd2wludndz2bby4.jpg",
    "title": "HackNEX Moment 8",
    "mediaType": "image",
    "width": 5712,
    "height": 4284,
    "aspectRatio": 1.33,
    "orientation": "landscape"
  },
  {
    "id": "kuxr1oucynhagrdlkmss",
    "imageFile": "https://res.cloudinary.com/demc5rxwn/image/upload/f_auto,q_auto,w_1200/v1792662852/kuxr1oucynhagrdlkmss.jpg",
    "title": "HackNEX Moment 9",
    "mediaType": "image",
    "width": 1430,
    "height": 800,
    "aspectRatio": 1.79,
    "orientation": "landscape"
  },
  {
    "id": "fyokxcvibj8fxgodlybf",
    "imageFile": "https://res.cloudinary.com/demc5rxwn/image/upload/f_auto,q_auto,w_1200/v1792662852/fyokxcvibj8fxgodlybf.jpg",
    "title": "HackNEX Moment 10",
    "mediaType": "image",
    "width": 4032,
    "height": 2268,
    "aspectRatio": 1.78,
    "orientation": "landscape"
  },
  {
    "id": "hw6xvgby1lvekun39mju",
    "imageFile": "https://res.cloudinary.com/demc5rxwn/image/upload/f_auto,q_auto,w_1200/v1792662851/hw6xvgby1lvekun39mju.jpg",
    "title": "HackNEX Moment 11",
    "mediaType": "image",
    "width": 4032,
    "height": 3024,
    "aspectRatio": 1.33,
    "orientation": "landscape"
  },
  {
    "id": "efseg0sb5qvxxonahqlx",
    "imageFile": "https://res.cloudinary.com/demc5rxwn/image/upload/f_auto,q_auto,w_1200/v1792662851/efseg0sb5qvxxonahqlx.jpg",
    "title": "HackNEX Moment 12",
    "mediaType": "image",
    "width": 1052,
    "height": 588,
    "aspectRatio": 1.79,
    "orientation": "landscape"
  },
  {
    "id": "oisf3qys67yjvbtcs0dp",
    "imageFile": "https://res.cloudinary.com/demc5rxwn/image/upload/f_auto,q_auto,w_1200/v1792662850/oisf3qys67yjvbtcs0dp.jpg",
    "title": "HackNEX Moment 13",
    "mediaType": "image",
    "width": 4032,
    "height": 2268,
    "aspectRatio": 1.78,
    "orientation": "landscape"
  },
  {
    "id": "oqm8yg84hnnrnaste5op",
    "imageFile": "https://res.cloudinary.com/demc5rxwn/image/upload/f_auto,q_auto,w_1200/v1792662850/oqm8yg84hnnrnaste5op.jpg",
    "title": "HackNEX Moment 14",
    "mediaType": "image",
    "width": 5712,
    "height": 3213,
    "aspectRatio": 1.78,
    "orientation": "landscape"
  },
  {
    "id": "wweybn3xgvpxzbanfr5t",
    "imageFile": "https://res.cloudinary.com/demc5rxwn/image/upload/f_auto,q_auto,w_1200/v1792662850/wweybn3xgvpxzbanfr5t.jpg",
    "title": "HackNEX Moment 15",
    "mediaType": "image",
    "width": 4032,
    "height": 3024,
    "aspectRatio": 1.33,
    "orientation": "landscape"
  },
  {
    "id": "s9dzfhoikbm4c95kidpl",
    "imageFile": "https://res.cloudinary.com/demc5rxwn/image/upload/f_auto,q_auto,w_1200/v1792662849/s9dzfhoikbm4c95kidpl.jpg",
    "title": "HackNEX Moment 16",
    "mediaType": "image",
    "width": 4032,
    "height": 2268,
    "aspectRatio": 1.78,
    "orientation": "landscape"
  },
  {
    "id": "bxgnhfap7426hlkzc7je",
    "imageFile": "https://res.cloudinary.com/demc5rxwn/image/upload/f_auto,q_auto,w_1200/v1792662849/bxgnhfap7426hlkzc7je.jpg",
    "title": "HackNEX Moment 17",
    "mediaType": "image",
    "width": 5712,
    "height": 3213,
    "aspectRatio": 1.78,
    "orientation": "landscape"
  },
  {
    "id": "y2zawy3uhvzl8xnjfasl",
    "imageFile": "https://res.cloudinary.com/demc5rxwn/image/upload/f_auto,q_auto,w_1200/v1792662849/y2zawy3uhvzl8xnjfasl.jpg",
    "title": "HackNEX Moment 18",
    "mediaType": "image",
    "width": 4032,
    "height": 3024,
    "aspectRatio": 1.33,
    "orientation": "landscape"
  },
  {
    "id": "xllfe734eeqgjv1lqwap",
    "imageFile": "https://res.cloudinary.com/demc5rxwn/image/upload/f_auto,q_auto,w_1200/v1792662848/xllfe734eeqgjv1lqwap.jpg",
    "title": "HackNEX Moment 19",
    "mediaType": "image",
    "width": 1437,
    "height": 802,
    "aspectRatio": 1.79,
    "orientation": "landscape"
  },
  {
    "id": "wqn6cqpfvbvxydetsjhj",
    "imageFile": "https://res.cloudinary.com/demc5rxwn/image/upload/f_auto,q_auto,w_1200/v1792662848/wqn6cqpfvbvxydetsjhj.jpg",
    "title": "HackNEX Moment 20",
    "mediaType": "image",
    "width": 5712,
    "height": 3213,
    "aspectRatio": 1.78,
    "orientation": "landscape"
  },
  {
    "id": "frlf1ofwdpzpnw1tca0a",
    "imageFile": "https://res.cloudinary.com/demc5rxwn/image/upload/f_auto,q_auto,w_1200/v1792662847/frlf1ofwdpzpnw1tca0a.jpg",
    "title": "HackNEX Moment 21",
    "mediaType": "image",
    "width": 1280,
    "height": 720,
    "aspectRatio": 1.78,
    "orientation": "landscape"
  },
  {
    "id": "x89j48t75cvyldxdzj7q",
    "imageFile": "https://res.cloudinary.com/demc5rxwn/image/upload/f_auto,q_auto,w_1200/v1792662847/x89j48t75cvyldxdzj7q.jpg",
    "title": "HackNEX Moment 22",
    "mediaType": "image",
    "width": 1438,
    "height": 802,
    "aspectRatio": 1.79,
    "orientation": "landscape"
  },
  {
    "id": "pvvb4w3hwubxgsfvdz14",
    "imageFile": "https://res.cloudinary.com/demc5rxwn/image/upload/f_auto,q_auto,w_1200/v1792662846/pvvb4w3hwubxgsfvdz14.jpg",
    "title": "HackNEX Moment 23",
    "mediaType": "image",
    "width": 1433,
    "height": 801,
    "aspectRatio": 1.79,
    "orientation": "landscape"
  },
  {
    "id": "usxgvkfctlseugqcbpbn",
    "imageFile": "https://res.cloudinary.com/demc5rxwn/image/upload/f_auto,q_auto,w_1200/v1792662846/usxgvkfctlseugqcbpbn.jpg",
    "title": "HackNEX Moment 24",
    "mediaType": "image",
    "width": 1080,
    "height": 1440,
    "aspectRatio": 0.75,
    "orientation": "portrait"
  },
  {
    "id": "zpw5kkonjm6pb4eoo8nx",
    "imageFile": "https://res.cloudinary.com/demc5rxwn/image/upload/f_auto,q_auto,w_1200/v1792662845/zpw5kkonjm6pb4eoo8nx.jpg",
    "title": "HackNEX Moment 25",
    "mediaType": "image",
    "width": 2268,
    "height": 4032,
    "aspectRatio": 0.56,
    "orientation": "portrait"
  },
  {
    "id": "tr0qogtrffpi6kqm9vlg",
    "imageFile": "https://res.cloudinary.com/demc5rxwn/image/upload/f_auto,q_auto,w_1200/v1792662844/tr0qogtrffpi6kqm9vlg.jpg",
    "title": "HackNEX Moment 26",
    "mediaType": "image",
    "width": 4032,
    "height": 3024,
    "aspectRatio": 1.33,
    "orientation": "landscape"
  },
  {
    "id": "pyy2ss8oobcwg67fvcqm",
    "imageFile": "https://res.cloudinary.com/demc5rxwn/image/upload/f_auto,q_auto,w_1200/v1792662844/pyy2ss8oobcwg67fvcqm.jpg",
    "title": "HackNEX Moment 27",
    "mediaType": "image",
    "width": 4032,
    "height": 2268,
    "aspectRatio": 1.78,
    "orientation": "landscape"
  },
  {
    "id": "ni4nlhyxhzyyqnj7wdul",
    "imageFile": "https://res.cloudinary.com/demc5rxwn/image/upload/f_auto,q_auto,w_1200/v1792662844/ni4nlhyxhzyyqnj7wdul.jpg",
    "title": "HackNEX Moment 28",
    "mediaType": "image",
    "width": 1442,
    "height": 805,
    "aspectRatio": 1.79,
    "orientation": "landscape"
  },
  {
    "id": "siajhwcfouovmxijqxdd",
    "imageFile": "https://res.cloudinary.com/demc5rxwn/image/upload/f_auto,q_auto,w_1200/v1792662844/siajhwcfouovmxijqxdd.jpg",
    "title": "HackNEX Moment 29",
    "mediaType": "image",
    "width": 1587,
    "height": 2245,
    "aspectRatio": 0.71,
    "orientation": "portrait"
  },
  {
    "id": "mmnok3snwwidculaiopa",
    "imageFile": "https://res.cloudinary.com/demc5rxwn/image/upload/f_auto,q_auto,w_1200/v1792662842/mmnok3snwwidculaiopa.jpg",
    "title": "HackNEX Moment 30",
    "mediaType": "image",
    "width": 1441,
    "height": 800,
    "aspectRatio": 1.8,
    "orientation": "landscape"
  },
  {
    "id": "chbe81tpt8uhtlznxxxl",
    "imageFile": "https://res.cloudinary.com/demc5rxwn/image/upload/f_auto,q_auto,w_1200/v1792662841/chbe81tpt8uhtlznxxxl.jpg",
    "title": "HackNEX Moment 31",
    "mediaType": "image",
    "width": 2046,
    "height": 939,
    "aspectRatio": 2.18,
    "orientation": "landscape"
  }
];
