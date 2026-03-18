export const mathLessons = {
  "lessons": [
    {
      "id": "lesson_1",
      "title": "Làm quen số (1 → 5)",
      "goal": [
        "Nhận biết số từ 1 đến 5",
        "Đếm vật thật"
      ],
      "content": [
        {
          "type": "visual_counting",
          "data": {
            "items": [
              { "item": "con ngựa", "count": 1, "number": "một" },
              { "item": "con dê", "count": 2, "number": "hai" },
              { "item": "bắp ngô", "count": 3, "number": "ba" },
              { "item": "quả bí", "count": 4, "number": "bốn" },
              { "item": "cây lúa", "count": 5, "number": "năm" }
            ]
          }
        },
        {
          "type": "concept",
          "data": {
            "title": "Ghép số",
            "example": {
              "visual": { "item": "con dê", "count": 3 },
              "options": [1, 2, 3],
              "correctIndex": 2
            }
          }
        }
      ],
      "interactive": [
        {
          "type": "tap_repeat",
          "instruction": "Cho người học bấm vào từng hình",
          "action": "App đọc lại số tương ứng"
        },
        {
          "type": "match_number",
          "instruction": "Người học chọn số đúng"
        }
      ],
      "quiz": [
        {
          "question": "Có 2 con dê. Chọn số đúng:",
          "visual": { "item": "con dê", "count": 2 },
          "options": ["1", "2", "3"],
          "correctIndex": 1
        },
        {
          "question": "Có 4 quả bí. Chọn số đúng:",
          "visual": { "item": "quả bí", "count": 4 },
          "options": ["3", "4", "5"],
          "correctIndex": 1
        },
        {
          "question": "Có 1 con ngựa. Chọn số đúng:",
          "visual": { "item": "con ngựa", "count": 1 },
          "options": ["1", "2", "3"],
          "correctIndex": 0
        }
      ]
    },
    {
      "id": "lesson_2",
      "title": "Phép cộng đơn giản",
      "goal": [
        "Hiểu \"thêm vào\"",
        "Làm quen phép cộng ≤ 5"
      ],
      "content": [
        {
          "type": "concept",
          "data": {
            "title": "Khái niệm \"thêm\"",
            "steps": [
              {
                "stage": "Ban đầu",
                "visual": { "item": "con dê", "count": 2 }
              },
              {
                "stage": "Sau đó",
                "action": "thêm 1 con"
              },
              {
                "stage": "Kết quả",
                "visual": { "item": "con dê", "count": 3 },
                "read": "2 thêm 1 là 3"
              }
            ]
          }
        },
        {
          "type": "example",
          "data": {
            "title": "Minh họa trực quan",
            "examples": [
              {
                "operation": { "item": "con ngựa", "a": 1, "b": 1, "result": 2 }
              },
              {
                "operation": { "item": "bắp ngô", "a": 3, "b": 1, "result": 4 }
              }
            ]
          }
        },
        {
          "type": "symbol",
          "data": {
            "title": "Giới thiệu ký hiệu (rất nhẹ)",
            "formula": "2 + 1 = 3",
            "read": "2 cộng 1 bằng 3",
            "note": "Không giải thích sâu, chỉ đọc"
          }
        }
      ],
      "interactive": [],
      "quiz": [
        {
          "question": "2 con dê + 1 con dê = ?",
          "visual": { "item": "con dê", "operation": "2 + 1" },
          "options": ["2", "3", "4"],
          "correctIndex": 1
        },
        {
          "question": "1 con ngựa + 1 con ngựa = ?",
          "visual": { "item": "con ngựa", "operation": "1 + 1" },
          "options": ["1", "2", "3"],
          "correctIndex": 1
        },
        {
          "question": "3 bắp ngô + 1 bắp = ?",
          "visual": { "item": "bắp ngô", "operation": "3 + 1" },
          "options": ["3", "4", "5"],
          "correctIndex": 1
        }
      ]
    },
    {
      "id": "lesson_3",
      "title": "Phép trừ đơn giản",
      "goal": [
        "Hiểu \"bớt đi\"",
        "Làm quen phép trừ ≤ 5"
      ],
      "content": [
        {
          "type": "concept",
          "data": {
            "title": "Khái niệm \"bớt\"",
            "steps": [
              {
                "stage": "Ban đầu",
                "visual": { "item": "con dê", "count": 3 }
              },
              {
                "stage": "Sau đó",
                "action": "bớt 1 con"
              },
              {
                "stage": "Kết quả",
                "visual": { "item": "con dê", "count": 2 },
                "read": "3 bớt 1 còn 2"
              }
            ]
          }
        },
        {
          "type": "example",
          "data": {
            "title": "Minh họa đời sống",
            "examples": [
              {
                "scenario": "5 quả bí, ăn 1 → còn 4",
                "operation": { "item": "quả bí", "a": 5, "b": 1, "result": 4 }
              },
              {
                "scenario": "4 cây lúa, mất 1 → còn 3",
                "operation": { "item": "cây lúa", "a": 4, "b": 1, "result": 3 }
              }
            ]
          }
        },
        {
          "type": "symbol",
          "data": {
            "title": "Ký hiệu",
            "formula": "3 - 1 = 2",
            "note": "Chỉ đọc, không giải thích trừu tượng"
          }
        }
      ],
      "interactive": [],
      "quiz": [
        {
          "question": "3 con dê bớt 1 con = ?",
          "visual": { "item": "con dê", "operation": "3 - 1" },
          "options": ["1", "2", "3"],
          "correctIndex": 1
        },
        {
          "question": "5 quả bí bớt 1 quả = ?",
          "visual": { "item": "quả bí", "operation": "5 - 1" },
          "options": ["3", "4", "5"],
          "correctIndex": 1
        },
        {
          "question": "2 con ngựa bớt 1 con = ?",
          "visual": { "item": "con ngựa", "operation": "2 - 1" },
          "options": ["1", "2", "3"],
          "correctIndex": 0
        }
      ]
    }
  ]
};
