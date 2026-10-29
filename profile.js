/*
 * 个人主页内容配置：编辑姓名、简介、论文、经历和链接即可更新页面。
 * 来源核对日期：2026-10-28。只展示第一署名为 Jiangshan Wang 的六篇论文。
 * 论文与图片来源见 SOURCES.md。留空的链接不会显示。
 */
window.PROFILE = {
  "name": "Jiangshan Wang",
  "nativeName": "王江山",
  "affiliation": "Ph.D. Student · MMLab, The Chinese University of Hong Kong",
  "description": "Jiangshan Wang is a Ph.D. student at MMLab, The Chinese University of Hong Kong. His research focuses on efficient visual generation, generative models, and image and video editing.",
  "bio": [
    "Hi, I’m Jiangshan, a Ph.D. student at **MMLab, The Chinese University of Hong Kong**, advised by [Prof. Xiangyu Yue](https://xyue.io/). I received my master’s degree in Artificial Intelligence from **Tsinghua University**, advised by [Prof. Xiu Li](https://www.sigs.tsinghua.edu.cn/lx_en/main.psp). I received my bachelor’s degree in Telecommunication Engineering from **Beijing University of Posts and Telecommunications**.",
    "My research focuses on AIGC, such as **generative foundation models**, **efficient visual generation**, and **image and video editing**.",
    "Previously, I worked on generative AI as a research intern at **Tencent Hunyuan**, **Alibaba Tongyi Lab**, and **Tencent ARC Lab**.",
    "I’m always open to exchange ideas and explore research collaborations."
  ],
  "email": "1155281975@link.cuhk.edu.hk",
  "scholar": "https://scholar.google.com/citations?user=HoKoCv0AAAAJ&hl=en",
  "github": "https://github.com/wangjiangshan0725",
  "cv": "",
  "researchTitle": "Selected Publications",
  "publications": [
    {
      "id": "tex-zero",
      "title": "Does Native 3D Texture Generation Necessarily Require 3D Assets for Training?",
      "authors": "**Jiangshan Wang**, Zeqiang Lai, Jiayi Guo, Xin Yang, Xin Huang, Jiarui Chen, Ziheng Ouyang, Chunchao Guo, Xiangyu Yue",
      "venue": "arXiv preprint",
      "year": "2026",
      "image": "assets/tex-zero.jpg",
      "imageAlt": "Tex-Zero paper teaser: learning native 3D textures from 2D images",
      "summary": "We train a 3D texture generation model from scratch (including a FLUX-style VAE and DiT) using large-scale 2D image data, and explore scaling strategies for 3D generative models.",
      "example": false,
      "selected": true,
      "links": {
        "paper": "https://arxiv.org/abs/2609.34621",
        "code": "https://github.com/wangjiangshan0725/Tex-Zero",
        "project": ""
      },
      "bibtex": "@misc{wang2026texzero,\n  title={Does Native 3D Texture Generation Necessarily Require 3D Assets for Training?},\n  author={Jiangshan Wang and Zeqiang Lai and Jiayi Guo and Xin Yang and Xin Huang and Jiarui Chen and Ziheng Ouyang and Chunchao Guo and Xiangyu Yue},\n  year={2026},\n  eprint={2609.34621},\n  archivePrefix={arXiv},\n  primaryClass={cs.CV}\n}",
      "bibtexFile": "citations/tex-zero.bib"
    },
    {
      "id": "elastic-dit",
      "title": "Elastic Diffusion Transformer",
      "authors": "**Jiangshan Wang**, Zeqiang Lai, Jiarui Chen, Jiayi Guo, Hang Guo, Xiu Li, Xiangyu Yue, Chunchao Guo",
      "venue": "ICML",
      "year": "2026",
      "image": "assets/elastic-dit.jpg",
      "imageAlt": "Elastic Diffusion Transformer architecture with adaptive block and MLP routing",
      "summary": "Converting DiTs into dynamic network architectures for lossless acceleration, applicable to mainstream generative models such as Qwen-Image.",
      "example": false,
      "selected": true,
      "links": {
        "paper": "https://arxiv.org/abs/2602.13993",
        "code": "https://github.com/wangjiangshan0725/Elastic-DiT",
        "project": ""
      },
      "bibtex": "@misc{wang2026elasticdit,\n  title={Elastic Diffusion Transformer},\n  author={Jiangshan Wang and Zeqiang Lai and Jiarui Chen and Jiayi Guo and Hang Guo and Xiu Li and Xiangyu Yue and Chunchao Guo},\n  year={2026},\n  eprint={2602.13993},\n  archivePrefix={arXiv},\n  primaryClass={cs.CV}\n}",
      "bibtexFile": "citations/elastic-dit.bib"
    },
    {
      "id": "precisecache",
      "title": "PreciseCache: Precise Feature Caching for Efficient and High-fidelity Video Generation",
      "authors": "**Jiangshan Wang**, Kang Zhao, Jiayi Guo, Jiayu Wang, Hang Guo, Chenyang Zhu, Xiu Li, Xiangyu Yue",
      "venue": "ICLR",
      "year": "2026",
      "image": "assets/precisecache-method.png",
      "imageAlt": "PreciseCache method overview showing LFCache and BlockCache; Figure 5",
      "summary": "A training-free caching methods for DiT which identifies and caches redundant computation at both the denoising-step and transformer-block levels.",
      "example": false,
      "selected": true,
      "links": {
        "paper": "https://arxiv.org/abs/2603.00976",
        "code": "",
        "project": ""
      },
      "bibtex": "@misc{wang2026precisecache,\n  title={PreciseCache: Precise Feature Caching for Efficient and High-fidelity Video Generation},\n  author={Jiangshan Wang and Kang Zhao and Jiayi Guo and Jiayu Wang and Hang Guo and Chenyang Zhu and Xiu Li and Xiangyu Yue},\n  year={2026},\n  eprint={2603.00976},\n  archivePrefix={arXiv},\n  primaryClass={cs.CV}\n}",
      "bibtexFile": "citations/precisecache.bib"
    },
    {
      "id": "rf-solver",
      "title": "Taming Rectified Flow for Inversion and Editing",
      "authors": "**Jiangshan Wang**, Junfu Pu, Zhongang Qi, Jiayi Guo, Yue Ma, Nisha Huang, Yuxin Chen, Xiu Li, Ying Shan",
      "venue": "ICML",
      "year": "2025",
      "image": "assets/rf-solver-method.png",
      "imageAlt": "RF-Edit method pipelines for image and video editing; Figure 3",
      "summary": "The first work exploring to adapt rectified-flow-based DiT (such as FLUX and HunyuanVideo) for image and video editing.",
      "example": false,
      "selected": true,
      "links": {
        "paper": "https://arxiv.org/abs/2411.04746",
        "code": "https://github.com/wangjiangshan0725/RF-Solver-Edit",
        "project": ""
      },
      "bibtex": "@misc{wang2024rfsolver,\n  title={Taming Rectified Flow for Inversion and Editing},\n  author={Jiangshan Wang and Junfu Pu and Zhongang Qi and Jiayi Guo and Yue Ma and Nisha Huang and Yuxin Chen and Xiu Li and Ying Shan},\n  year={2024},\n  eprint={2411.04746},\n  archivePrefix={arXiv},\n  primaryClass={cs.CV}\n}",
      "bibtexFile": "citations/rf-solver.bib"
    },
    {
      "id": "cove",
      "title": "COVE: Unleashing the Diffusion Feature Correspondence for Consistent Video Editing",
      "authors": "**Jiangshan Wang**, Yue Ma, Jiayi Guo, Yicheng Xiao, Gao Huang, Xiu Li",
      "venue": "NeurIPS",
      "year": "2024",
      "image": "assets/cove-method.png",
      "imageAlt": "COVE method overview showing feature correspondence and correspondence-guided attention; Figure 3",
      "summary": "Adapting the pretrained image diffusion model for video editing.",
      "example": false,
      "selected": true,
      "links": {
        "paper": "https://arxiv.org/abs/2406.08850",
        "code": "https://github.com/wangjiangshan0725/COVE",
        "project": ""
      },
      "bibtex": "@misc{wang2024cove,\n  title={COVE: Unleashing the Diffusion Feature Correspondence for Consistent Video Editing},\n  author={Jiangshan Wang and Yue Ma and Jiayi Guo and Yicheng Xiao and Gao Huang and Xiu Li},\n  year={2024},\n  eprint={2406.08850},\n  archivePrefix={arXiv},\n  primaryClass={cs.CV}\n}",
      "bibtexFile": "citations/cove.bib"
    },
    {
      "id": "gra",
      "title": "GRA: Detecting Oriented Objects through Group-wise Rotating and Attention",
      "authors": "**Jiangshan Wang**, Yifan Pu, Yizeng Han, Jiayi Guo, Yiru Wang, Xiu Li, Gao Huang",
      "venue": "ECCV",
      "year": "2024",
      "image": "assets/gra-method.svg",
      "imageAlt": "GRA method overview with Group-wise Rotating and Group-wise Attention; Figure 4",
      "summary": "A lightweight module for high-performance oriented object detection.",
      "example": false,
      "selected": true,
      "links": {
        "paper": "https://arxiv.org/abs/2403.11127",
        "code": "https://github.com/wangjiangshan0725/GRA",
        "project": ""
      },
      "bibtex": "@misc{wang2024gra,\n  title={GRA: Detecting Oriented Objects through Group-wise Rotating and Attention},\n  author={Jiangshan Wang and Yifan Pu and Yizeng Han and Jiayi Guo and Yiru Wang and Xiu Li and Gao Huang},\n  year={2024},\n  eprint={2403.11127},\n  archivePrefix={arXiv},\n  primaryClass={cs.CV}\n}",
      "bibtexFile": "citations/gra.bib"
    }
  ],
  "experience": [
    {
      "type": "research",
      "organization": "Tencent Hunyuan",
      "role": "Research Intern · Qingyun Program",
      "dates": "Oct. 2025 — Sep. 2026",
      "detail": "Diffusion acceleration; Unified multimodal generation.",
      "url": "",
      "collaborators": [
        {
          "name": "Zeqiang Lai",
          "url": "https://zeqiang-lai.github.io/"
        }
      ]
    },
    {
      "type": "research",
      "organization": "Alibaba Tongyi Lab",
      "role": "Research Intern · Wan Team",
      "dates": "Apr. 2025 — Sep. 2025",
      "detail": "Video generation foundation model; Diffusion acceleration.",
      "url": "",
      "collaborators": [
        {
          "name": "Jiayu Wang",
          "url": "https://scholar.google.com/citations?user=pOgc1A0AAAAJ&hl=en"
        },
        {
          "name": "Kang Zhao",
          "url": "https://kangzhao2.github.io/"
        },
        {
          "name": "Yingya Zhang",
          "url": "https://scholar.google.com/citations?user=16RDSEUAAAAJ&hl=en"
        }
      ]
    },
    {
      "type": "research",
      "organization": "Tencent ARC Lab",
      "role": "Research Intern",
      "dates": "Aug. 2024 — Mar. 2025",
      "detail": "Image and video editing.",
      "url": "",
      "collaborators": [
        {
          "name": "Junfu Pu",
          "url": "https://pujunfu.github.io/"
        },
        {
          "name": "Zhongang Qi",
          "url": "https://zhongangqi.github.io/index.html"
        },
        {
          "name": "Ying Shan",
          "url": "https://scholar.google.com/citations?user=4oXBp9UAAAAJ&hl=en"
        }
      ]
    }
  ],
  "footerNote": "MMLab · The Chinese University of Hong Kong",
  "education": [
    {
      "type": "education",
      "organization": "MMLab, The Chinese University of Hong Kong",
      "role": "Ph.D. Student · Information Engineering",
      "dates": "",
      "detail": "",
      "url": ""
    },
    {
      "type": "education",
      "organization": "Tsinghua University",
      "role": "Master’s Degree · Artificial Intelligence",
      "dates": "",
      "detail": "",
      "url": ""
    },
    {
      "type": "education",
      "organization": "Beijing University of Posts and Telecommunications",
      "role": "Bachelor’s Degree · Telecommunication Engineering",
      "dates": "",
      "detail": "",
      "url": ""
    }
  ],
  "awards": [
    "**2024** · First-Class Scholarship, Tsinghua University",
    "**2023** · Outstanding Graduate, Beijing",
    "**2023** · Outstanding Graduate, BUPT",
    "**2020 & 2021** · National Scholarship"
  ],
  "wechat": "doudliszz"
};
