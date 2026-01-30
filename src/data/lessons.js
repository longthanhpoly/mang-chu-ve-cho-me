// Lesson data structure for all topics

export const lessons = {
  alphabet: {
    id: 'alphabet',
    title: 'Bảng chữ cái & số đếm',
    icon: '🔤',
    items: [
      // Alphabet (29 letters)
      { id: 'a', text: 'A', image: '/vectors/alphabet/a.webp', audio: '/audio/alphabet/a.mp3' },
      { id: 'ă', text: 'Ă', image: '/vectors/alphabet/ă.webp', audio: '/audio/alphabet/ă.mp3' },
      { id: 'â', text: 'Â', image: '/vectors/alphabet/â.webp', audio: '/audio/alphabet/â.mp3' },
      { id: 'b', text: 'B', image: '/vectors/alphabet/b.webp', audio: '/audio/alphabet/b.mp3' },
      { id: 'c', text: 'C', image: '/vectors/alphabet/c.webp', audio: '/audio/alphabet/c.mp3' },
      { id: 'd', text: 'D', image: '/vectors/alphabet/d.webp', audio: '/audio/alphabet/d.mp3' },
      { id: 'đ', text: 'Đ', image: '/vectors/alphabet/đ.webp', audio: '/audio/alphabet/đ.mp3' },
      { id: 'e', text: 'E', image: '/vectors/alphabet/e.webp', audio: '/audio/alphabet/e.mp3' },
      { id: 'ê', text: 'Ê', image: '/vectors/alphabet/ê.webp', audio: '/audio/alphabet/ê.mp3' },
      { id: 'g', text: 'G', image: '/vectors/alphabet/g.webp', audio: '/audio/alphabet/g.mp3' },
      { id: 'h', text: 'H', image: '/vectors/alphabet/h.webp', audio: '/audio/alphabet/h.mp3' },
      { id: 'i', text: 'I', image: '/vectors/alphabet/i.webp', audio: '/audio/alphabet/i.mp3' },
      { id: 'k', text: 'K', image: '/vectors/alphabet/k.webp', audio: '/audio/alphabet/k.mp3' },
      { id: 'l', text: 'L', image: '/vectors/alphabet/l.webp', audio: '/audio/alphabet/l.mp3' },
      { id: 'm', text: 'M', image: '/vectors/alphabet/m.webp', audio: '/audio/alphabet/m.mp3' },
      { id: 'n', text: 'N', image: '/vectors/alphabet/n.webp', audio: '/audio/alphabet/n.mp3' },
      { id: 'o', text: 'O', image: '/vectors/alphabet/o.webp', audio: '/audio/alphabet/o.mp3' },
      { id: 'ô', text: 'Ô', image: '/vectors/alphabet/ô.webp', audio: '/audio/alphabet/ô.mp3' },
      { id: 'ơ', text: 'Ơ', image: '/vectors/alphabet/ơ.webp', audio: '/audio/alphabet/ơ.mp3' },
      { id: 'p', text: 'P', image: '/vectors/alphabet/p.webp', audio: '/audio/alphabet/p.mp3' },
      { id: 'q', text: 'Q', image: '/vectors/alphabet/q.webp', audio: '/audio/alphabet/q.mp3' },
      { id: 'r', text: 'R', image: '/vectors/alphabet/r.webp', audio: '/audio/alphabet/r.mp3' },
      { id: 's', text: 'S', image: '/vectors/alphabet/s.webp', audio: '/audio/alphabet/s.mp3' },
      { id: 't', text: 'T', image: '/vectors/alphabet/t.webp', audio: '/audio/alphabet/t.mp3' },
      { id: 'u', text: 'U', image: '/vectors/alphabet/u.webp', audio: '/audio/alphabet/u.mp3' },
      { id: 'ư', text: 'Ư', image: '/vectors/alphabet/ư.webp', audio: '/audio/alphabet/ư.mp3' },
      { id: 'v', text: 'V', image: '/vectors/alphabet/v.webp', audio: '/audio/alphabet/v.mp3' },
      { id: 'x', text: 'X', image: '/vectors/alphabet/x.webp', audio: '/audio/alphabet/x.mp3' },
      { id: 'y', text: 'Y', image: '/vectors/alphabet/y.webp', audio: '/audio/alphabet/y.mp3' },
      
      // Numbers (10 numbers)
      { id: '0', text: '0', image: '/vectors/numbers/0.webp', audio: '/audio/numbers/0.mp3' },
      { id: '1', text: '1', image: '/vectors/numbers/1.webp', audio: '/audio/numbers/1.mp3' },
      { id: '2', text: '2', image: '/vectors/numbers/2.webp', audio: '/audio/numbers/2.mp3' },
      { id: '3', text: '3', image: '/vectors/numbers/3.webp', audio: '/audio/numbers/3.mp3' },
      { id: '4', text: '4', image: '/vectors/numbers/4.webp', audio: '/audio/numbers/4.mp3' },
      { id: '5', text: '5', image: '/vectors/numbers/5.webp', audio: '/audio/numbers/5.mp3' },
      { id: '6', text: '6', image: '/vectors/numbers/6.webp', audio: '/audio/numbers/6.mp3' },
      { id: '7', text: '7', image: '/vectors/numbers/7.webp', audio: '/audio/numbers/7.mp3' },
      { id: '8', text: '8', image: '/vectors/numbers/8.webp', audio: '/audio/numbers/8.mp3' },
      { id: '9', text: '9', image: '/vectors/numbers/9.webp', audio: '/audio/numbers/9.mp3' }
    ]
  },

  animals: {
    id: 'animals',
    title: 'Con vật',
    icon: '🐾',
    items: [
      { id: 'con_ca', text: 'Con Cá', image: '/vectors/animals/con_ca.webp', audio: '/audio/animals/con_ca.mp3' },
      { id: 'con_chim', text: 'Con Chim', image: '/vectors/animals/con_chim.webp', audio: '/audio/animals/con_chim.mp3' },
      { id: 'con_cho', text: 'Con Chó', image: '/vectors/animals/con_cho.webp', audio: '/audio/animals/con_cho.mp3' },
      { id: 'con_ga', text: 'Con Gà', image: '/vectors/animals/con_ga.webp', audio: '/audio/animals/con_ga.mp3' },
      { id: 'con_lon', text: 'Con Lợn', image: '/vectors/animals/con_lon.webp', audio: '/audio/animals/con_lon.mp3' },
      { id: 'con_ngua', text: 'Con Ngựa', image: '/vectors/animals/con_ngua.webp', audio: '/audio/animals/con_ngua.mp3' },
      { id: 'con_trau', text: 'Con Trâu', image: '/vectors/animals/con_trau.webp', audio: '/audio/animals/con_trau.mp3' },
      { id: 'con_vit', text: 'Con Vịt', image: '/vectors/animals/con_vit.webp', audio: '/audio/animals/con_vit.mp3' }
    ]
  },

  nature: {
    id: 'nature',
    title: 'Thiên nhiên & thời tiết',
    icon: '🌿',
    items: [
      { id: 'bang_gia', text: 'Băng Giá', image: '/vectors/nature/bang_gia.webp', audio: '/audio/nature/bang_gia.mp3' },
      { id: 'troi_mua', text: 'Trời Mưa', image: '/vectors/nature/troi_mua.webp', audio: '/audio/nature/troi_mua.mp3' },
      { id: 'troi_nhieu_may', text: 'Trời Nhiều Mây', image: '/vectors/nature/troi_nhieu_may.webp', audio: '/audio/nature/troi_nhieu_may.mp3' },
      { id: 'buoi_sang', text: 'Buổi Sáng', image: '/vectors/nature/buoi_sang.webp', audio: '/audio/nature/buoi_sang.mp3' },
      { id: 'buoi_toi', text: 'Buổi Tối', image: '/vectors/nature/buoi_toi.webp', audio: '/audio/nature/buoi_toi.mp3' },
      { id: 'ngon_nui', text: 'Ngọn Núi', image: '/vectors/nature/ngon_nui.webp', audio: '/audio/nature/ngon_nui.mp3' },
      { id: 'thac_nuoc', text: 'Thác Nước', image: '/vectors/nature/thac_nuoc.webp', audio: '/audio/nature/thac_nuoc.mp3' },
      { id: 'ruong_bac_thang', text: 'Ruộng Bậc Thang', image: '/vectors/nature/ruong_bac_thang.webp', audio: '/audio/nature/ruong_bac_thang.mp3' }
    ]
  },

  items: {
    id: 'items',
    title: 'Đồ dùng & dụng cụ sản xuất',
    icon: '🔧',
    items: [
      { id: 'cai_bat', text: 'Cái Bát', image: '/vectors/items/cai_bat.webp', audio: '/audio/items/cai_bat.mp3' },
      { id: 'cai_dia', text: 'Cái Đĩa', image: '/vectors/items/cai_dia.webp', audio: '/audio/items/cai_dia.mp3' },
      { id: 'cai_coc', text: 'Cái Cốc', image: '/vectors/items/cai_coc.webp', audio: '/audio/items/cai_coc.mp3' },
      { id: 'con_dao', text: 'Con Dao', image: '/vectors/items/con_dao.webp', audio: '/audio/items/con_dao.mp3' },
      { id: 'khung_det_vai', text: 'Khung Dệt Vải', image: '/vectors/items/khung_det_vai.webp', audio: '/audio/items/khung_det_vai.mp3' },
      { id: 'may_khau', text: 'Máy Khâu', image: '/vectors/items/may_khau.webp', audio: '/audio/items/may_khau.mp3' },
      { id: 'may_xat_gao', text: 'Máy Xát Gạo', image: '/vectors/items/may_xat_gao.webp', audio: '/audio/items/may_xat_gao.mp3' },
      { id: 'coi_da_xay', text: 'Cối Đá Xay', image: '/vectors/items/coi_da_xay.webp', audio: '/audio/items/coi_da_xay.mp3' }
    ]
  },

  clothes: {
    id: 'clothes',
    title: 'Trang phục',
    icon: '👔',
    items: [
      { id: 'cai_ao', text: 'Cái Áo', image: '/vectors/clothes/cai_ao.webp', audio: '/audio/clothes/cai_ao.mp3' },
      { id: 'cai_mu', text: 'Cái Mũ', image: '/vectors/clothes/cai_mu.webp', audio: '/audio/clothes/cai_mu.mp3' },
      { id: 'cai_quan', text: 'Cái Quần', image: '/vectors/clothes/cai_quan.webp', audio: '/audio/clothes/cai_quan.mp3' },
      { id: 'cai_vay', text: 'Cái Váy', image: '/vectors/clothes/cai_vay.webp', audio: '/audio/clothes/cai_vay.mp3' },
      { id: 'doi_dep', text: 'Đôi Dép', image: '/vectors/clothes/doi_dep.webp', audio: '/audio/clothes/doi_dep.mp3' },
      { id: 'doi_giay', text: 'Đôi Giầy', image: '/vectors/clothes/doi_giay.webp', audio: '/audio/clothes/doi_giay.mp3' },
      { id: 'doi_tat', text: 'Đôi Tất', image: '/vectors/clothes/doi_tat.webp', audio: '/audio/clothes/doi_tat.mp3' },
      { id: 'trang_suc', text: 'Trang Sức', image: '/vectors/clothes/trang_suc.webp', audio: '/audio/clothes/trang_suc.mp3' }
    ]
  },

  family: {
    id: 'family',
    title: 'Người thân trong gia đình',
    icon: '👨‍👩‍👧‍👦',
    items: [
      { id: 'ong', text: 'Ông Nội/Ông Ngoại', image: '/vectors/family/ong.webp', audio: '/audio/family/ong.mp3' },
      { id: 'ba', text: 'Bà Nội/Bà Ngoại', image: '/vectors/family/ba.webp', audio: '/audio/family/ba.mp3' },
      { id: 'bo', text: 'Bố', image: '/vectors/family/bo.webp', audio: '/audio/family/bo.mp3' },
      { id: 'me', text: 'Mẹ', image: '/vectors/family/me.webp', audio: '/audio/family/me.mp3' },
      { id: 'con_gai', text: 'Con Gái', image: '/vectors/family/con_gai.webp', audio: '/audio/family/con_gai.mp3' },
      { id: 'con_trai', text: 'Con Trai', image: '/vectors/family/con_trai.webp', audio: '/audio/family/con_trai.mp3' },
      { id: 'anh_em', text: 'Anh/Em', image: '/vectors/family/anh_em.webp', audio: '/audio/family/anh_em.mp3' },
      { id: 'chi_em', text: 'Chị/Em', image: '/vectors/family/chi_em.webp', audio: '/audio/family/chi_em.mp3' }
    ]
  }
};

// Get all lessons as array
export const getAllLessons = () => {
  return Object.values(lessons);
};

// Get lesson by ID
export const getLessonById = (id) => {
  return lessons[id] || null;
};

// Get all items for quiz (excluding alphabet for now, as per requirements)
export const getQuizItems = () => {
  const quizTopics = ['animals', 'nature', 'items', 'clothes', 'family'];
  const allItems = [];
  
  quizTopics.forEach(topicId => {
    if (lessons[topicId]) {
      lessons[topicId].items.forEach(item => {
        allItems.push({
          ...item,
          topicId,
          topicTitle: lessons[topicId].title
        });
      });
    }
  });
  
  return allItems;
};
