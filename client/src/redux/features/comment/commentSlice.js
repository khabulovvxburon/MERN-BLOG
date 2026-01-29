import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "../../../utils/axios"

const initialState = {
    comments: [],
    loading: false,
}

export const createComment = createAsyncThunk("comment/createComent", async ({ postId, comment }) => {
    try {
        const { data } = await axios.post(`/comments/${postId}`, {
            postId,
            comment,
        })
        return data
    } catch (error) {
        console.log(error);

    }
})

export const getPostComments = createAsyncThunk("comment/getPostComments", async (postId) => {
    try {
        const { data } = await axios.get(`/posts/comments/${postId}`)
        return data
    } catch (error) {
        console.log(error);

    }
})

export const commentSlice = createSlice({
    name: "comment",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Создание коментов
            .addCase(createComment.pending, (state) => {
                state.loading = true
            })
            .addCase(createComment.fulfilled, (state, action) => {
                state.loading = false

                // agar comments yo‘q bo‘lib qolgan bo‘lsa — qayta array qilamiz
                if (!Array.isArray(state.comments)) {
                    state.comments = []
                }

                // backend qaysi formatda yuborganini tekshiramiz
                const newComment =
                    action.payload?.comment ?? action.payload

                if (newComment) {
                    state.comments.push(newComment)
                }
            })

            .addCase(createComment.rejected, (state) => {
                state.loading = false
            })

            // Получение коментов
            .addCase(getPostComments.pending, (state) => {
                state.loading = true
            })
            .addCase(getPostComments.fulfilled, (state, action) => {
                state.loading = false
                state.comments = Array.isArray(action.payload)
                    ? action.payload
                    : action.payload?.comments || []

            })
            .addCase(getPostComments.rejected, (state) => {
                state.loading = false
            })
    },
})

export default commentSlice.reducer